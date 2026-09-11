import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import content from "@/data/content.json";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import SectionHeader from "./ui/SectionHeader";

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

const faqs = [
  {
    q: "What kind of work are you strongest in?",
    a: "AI engineering, workflow automation, and full-stack product development.",
  },
  {
    q: "Are you available for freelance or full-time roles?",
    a: "Yes. I’m open to collaboration, internships-to-hire, and product work around AI, automation, and web platforms.",
  },
  {
    q: "What’s the fastest way to reach you?",
    a: "Email or WhatsApp. You can also send a message through the form on this page.",
  },
];

function getEmailJsErrorMessage(error: unknown) {
  if (error && typeof error === "object") {
    const maybe = error as { text?: string; message?: string; status?: number };
    if (maybe.text?.trim()) return maybe.text.trim();
    if (maybe.message?.trim()) return maybe.message.trim();
  }
  if (error instanceof Error && error.message) return error.message;
  return "Failed to send message. Please try again.";
}

export default function Contact() {
  const { hero } = content;
  const { email, socialMedia, whatsapp } = hero;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
      toast.error("Email service is not configured.");
      return;
    }

    setIsLoading(true);

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Alghif",
        to_email: email.address,
        reply_to: formData.email,
        name: formData.name,
        email: formData.email,
      });
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      const detail = getEmailJsErrorMessage(error);
      if (/invalid grant|reconnect/i.test(detail)) {
        toast.error("Email service needs reconnecting. Please email or WhatsApp me instead.");
      } else {
        toast.error(detail);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 md:py-28">
      <SectionHeader
        eyebrow="FAQs"
        title="Got questions? I’ve got answers."
        description="Have a project in mind or want to discuss opportunities? I’d love to hear from you."
      />

      <div className="grid gap-4 md:grid-cols-[1fr_1.1fr]">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <button
              key={faq.q}
              onClick={() => setOpenFaq(index)}
              className="nf-card w-full p-5 text-left"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-medium text-white">{faq.q}</p>
                <span className="text-[var(--muted)]">{openFaq === index ? "–" : "+"}</span>
              </div>
              <AnimatePresence initial={false}>
                {openFaq === index && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="mt-3 text-sm leading-relaxed text-[var(--muted)]"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="nf-card p-6 md:p-8"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Your name"
              required
              className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Your email"
              required
              className="rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
            placeholder="Your message"
            required
            rows={3}
            className="mt-4 w-full rounded-xl border border-white/10 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-white/20"
          />
          <button type="submit" disabled={isLoading} className="nf-btn-primary mt-3 w-full disabled:opacity-50">
            {isLoading ? "Sending..." : "Send message"}
          </button>
        </motion.form>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <a href={`mailto:${email.address}`} className="nf-card flex items-center gap-4 p-5 hover:border-white/16">
          <FaEnvelope className="text-[var(--accent)]" />
          <div>
            <p className="text-sm font-medium text-white">Email</p>
            <p className="text-xs text-[var(--muted)]">{email.address}</p>
          </div>
        </a>
        <a
          href={`https://wa.me/${whatsapp.number}`}
          target="_blank"
          rel="noopener noreferrer"
          className="nf-card flex items-center gap-4 p-5 hover:border-white/16"
        >
          <FaWhatsapp className="text-[var(--accent)]" />
          <div>
            <p className="text-sm font-medium text-white">WhatsApp</p>
            <p className="text-xs text-[var(--muted)]">{whatsapp.numberShow}</p>
          </div>
        </a>
        <div className="nf-card flex items-center justify-between p-5">
          <p className="text-sm font-medium text-white">Social</p>
          <div className="flex gap-2">
            {socialMedia.map((social) => (
              <a
                key={social.platform}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-2 text-white hover:bg-white/5"
              >
                {social.platform === "Github" && <FaGithub />}
                {social.platform === "LinkedIn" && <FaLinkedin />}
                {social.platform === "Instagram" && <FaInstagram />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
