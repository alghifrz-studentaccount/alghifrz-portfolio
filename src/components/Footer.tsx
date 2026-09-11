import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import content from "@/data/content.json";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const { hero, navbar } = content;
  const { socialMedia, email, whatsapp } = hero;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-[#080808] text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          className="nf-card mb-12 overflow-hidden bg-[linear-gradient(180deg,#161616,transparent)] px-6 py-12 text-center md:px-12"
        >
          <p className="nf-eyebrow mb-4">Let’s work</p>
          <h2 className="font-display text-4xl md:text-6xl">Ship every change with confidence</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--muted)]">
            See validation, automation, and execution in one continuous workflow — from idea to production.
          </p>
          <a href={`mailto:${email.address}`} className="nf-btn-primary mt-8">
            Get in touch
          </a>
        </motion.div>

        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-semibold">{hero.title.name}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{hero.title.highlight}</p>
            <a href={`mailto:${email.address}`} className="mt-5 flex items-center gap-2 text-sm text-zinc-400 hover:text-white">
              <FaEnvelope /> {email.address}
            </a>
            <a
              href={`https://wa.me/${whatsapp.number}`}
              className="mt-3 flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
            >
              <FaWhatsapp /> {whatsapp.numberShow}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Quick menu</h4>
            <ul className="mt-4 space-y-2">
              {navbar.menuItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-400 hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Social</h4>
            <div className="mt-4 flex gap-3">
              {socialMedia.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 p-3 text-white hover:bg-white/5"
                >
                  {social.platform === "Github" && <FaGithub />}
                  {social.platform === "LinkedIn" && <FaLinkedin />}
                  {social.platform === "Instagram" && <FaInstagram />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/8 pt-6 text-sm text-zinc-500 md:flex-row">
          <p>
            © {currentYear} {hero.title.name}. All rights reserved.
          </p>
          <p className="italic">“Just start, you’ll get used to it.”</p>
        </div>
      </div>
    </footer>
  );
}
