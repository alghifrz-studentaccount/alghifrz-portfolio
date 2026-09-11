import { useEffect, useMemo, useRef } from "react";
import { useAnimationFrame } from "framer-motion";
import type { IconType } from "react-icons";

type GlobeSkill = {
  name: string;
  icon: IconType;
  color: string;
  group: string;
};

function spherePoint(index: number, total: number) {
  const count = Math.max(total, 1);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = count === 1 ? 0 : 1 - (index / (count - 1)) * 2;
  const ring = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * index;
  return {
    x: Math.cos(theta) * ring,
    y,
    z: Math.sin(theta) * ring,
  };
}

export default function SkillGlobe({
  skills,
  activeName,
  onActiveChange,
}: {
  skills: GlobeSkill[];
  activeName: string | null;
  onActiveChange: (name: string | null) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rotX = useRef(-0.28);
  const rotY = useRef(0.35);
  const dragging = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const paused = useRef(false);
  const radiusRef = useRef(138);

  const points = useMemo(
    () => skills.map((_, index) => spherePoint(index, skills.length)),
    [skills]
  );

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      const size = Math.min(stage.clientWidth, stage.clientHeight);
      radiusRef.current = Math.max(96, Math.round(size * 0.34));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, skills.length);
  }, [skills.length]);

  useAnimationFrame((_, delta) => {
    if (!dragging.current && !paused.current) {
      rotY.current += delta * 0.0002;
    }

    const rx = rotX.current;
    const ry = rotY.current;
    const cosX = Math.cos(rx);
    const sinX = Math.sin(rx);
    const cosY = Math.cos(ry);
    const sinY = Math.sin(ry);
    const radius = radiusRef.current;

    points.forEach((point, index) => {
      const el = itemRefs.current[index];
      if (!el) return;

      const x1 = point.x * cosY + point.z * sinY;
      const z1 = -point.x * sinY + point.z * cosY;
      const y2 = point.y * cosX - z1 * sinX;
      const z2 = point.y * sinX + z1 * cosX;

      const depth = (z2 + 1) / 2;
      const scale = 0.72 + depth * 0.5;
      const opacity = 0.35 + depth * 0.65;

      el.style.transform = `translate3d(${x1 * radius}px, ${y2 * radius}px, 0) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.zIndex = String(Math.round(depth * 100));
    });
  });

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    last.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = event.clientX - last.current.x;
    const dy = event.clientY - last.current.y;
    last.current = { x: event.clientX, y: event.clientY };
    rotY.current += dx * 0.008;
    rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current - dy * 0.008));
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={stageRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerEnter={() => {
        paused.current = true;
      }}
      onPointerLeave={() => {
        paused.current = false;
        dragging.current = false;
        onActiveChange(null);
      }}
      className="skill-globe relative mx-auto aspect-square h-full w-auto max-h-full max-w-full cursor-grab touch-none select-none active:cursor-grabbing"
    >
      <div className="pointer-events-none absolute inset-[12%] rounded-full border border-white/8" />
      <div className="pointer-events-none absolute inset-[20%] rounded-full border border-white/[0.06]" />
      <div
        className="pointer-events-none absolute inset-[8%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.07), rgba(0,85,212,0.14) 42%, transparent 70%)",
          boxShadow: "inset 0 0 60px rgba(0,85,212,0.12), 0 0 80px rgba(0,85,212,0.1)",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[72%] h-6 w-[62%] -translate-x-1/2 rounded-[100%] bg-black/45 blur-md"
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center justify-center">
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          const active = activeName === skill.name;
          return (
            <button
              key={skill.name}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              onPointerEnter={() => onActiveChange(skill.name)}
              onFocus={() => onActiveChange(skill.name)}
              className="skill-globe-item absolute flex h-11 w-11 items-center justify-center rounded-full border bg-black/75 backdrop-blur-sm transition-[box-shadow,border-color] duration-200 md:h-12 md:w-12"
              style={{
                color: skill.color,
                borderColor: active ? skill.color : "rgba(255,255,255,0.14)",
                boxShadow: active
                  ? `0 0 24px ${skill.color}70`
                  : `0 0 14px ${skill.color}28`,
              }}
              aria-label={skill.name}
            >
              <Icon className="text-base md:text-lg" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
