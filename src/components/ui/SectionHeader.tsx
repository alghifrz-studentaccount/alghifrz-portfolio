import { motion } from "framer-motion";

type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7 }}
      className={`mb-10 md:mb-14 max-w-3xl ${alignment}`}
    >
      <p className="nf-eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-5xl leading-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm md:text-base text-[var(--muted)] leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
