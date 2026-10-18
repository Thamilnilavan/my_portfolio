"use client";
import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getContactSettings } from "@/content/contactSettings";
import Input from "../ui/Input";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiArrowRight, HiArrowUp } from "react-icons/hi";
import { FaWhatsapp, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

function ContactReveal({ text, gradient = false, delay = 0, reducedMotion }) {
  return <motion.span aria-hidden="true" initial={false}
    whileInView={reducedMotion ? undefined : { y: [8, 0], opacity: [0.55, 1] }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.85, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={`inline-block ${gradient ? "bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 bg-clip-text text-transparent" : ""}`}>{text}</motion.span>;
}

export default function Contact() {
  const { settings: s } = usePortfolioContent();
  const content = getContactSettings(s);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const sceneRef = useRef(null);
  const sceneVisible = useInView(sceneRef, { amount: 0.1 });
  const reduceMotion = useReducedMotion();
  const animated = !reduceMotion && sceneVisible;
  const reveal = (delay = 0) => ({
    initial: false,
    whileInView: reduceMotion ? undefined : { y: [8, 0], opacity: [0.6, 1] },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.75, delay, ease: [0.25, 0.1, 0.25, 1] },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, website }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setWebsite("");
    } catch (error) {
      toast.error(error.message || "Failed to send your message.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: HiOutlineMail, label: "Email", value: s.email, href: s.email ? `mailto:${s.email}` : null },
    { icon: HiOutlinePhone, label: "Phone", value: s.phone, href: s.phone ? `tel:${s.phone.replace(/\s/g, "")}` : null },
    { icon: HiOutlineLocationMarker, label: "Location", value: s.location, href: null },
  ];

  const socials = [
    { Icon: FaGithub, href: s.github, label: "GitHub" },
    { Icon: FaLinkedin, href: s.linkedin, label: "LinkedIn" },
    { Icon: FaTwitter, href: s.twitter, label: "X" },
  ].filter((item) => item.href);

  const whatsappHref = s.whatsapp?.startsWith("http")
    ? s.whatsapp
    : s.whatsapp
      ? `https://wa.me/${s.whatsapp.replace(/\D/g, "")}`
      : null;

  return (
    <section id="contact" ref={sceneRef} aria-labelledby="contact-heading" className="relative isolate overflow-hidden py-12 sm:py-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_60%,rgba(6,182,212,0.1),transparent_50%),radial-gradient(ellipse_at_85%_20%,rgba(124,58,237,0.18),transparent_50%)]" />
        <motion.div animate={animated ? { x: [0, 70, 0], opacity: [0.3, 0.6, 0.3] } : { x: 0, opacity: 0.4 }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-64 left-1/2 h-[650px] w-40 -rotate-[35deg] bg-violet-400/10 blur-[65px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />
        <span className="absolute bottom-8 left-0 hidden text-[clamp(100px,17vw,260px)] font-black leading-none tracking-[-0.07em] text-white/[0.025] lg:block">LET’S TALK</span>
      </div>
      <div className="relative mx-auto w-full max-w-[1600px] px-6 md:px-12 xl:px-20">
        <header className="mb-9 text-center sm:mb-12">
          <motion.div {...reveal()} className="mb-4 flex items-center justify-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-transparent to-cyan-300" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300">{content.contactEyebrow}</p>
            <span aria-hidden="true" className="h-px w-10 bg-gradient-to-l from-transparent to-violet-400" />
          </motion.div>
          <h2 aria-label={`${content.contactHeading} ${content.contactHeadingAccent}`} id="contact-heading" className="text-3xl font-bold leading-[1.12] tracking-[-0.045em] text-white sm:text-5xl lg:text-[64px]">
            <span className="sr-only">{content.contactHeading} {content.contactHeadingAccent}</span>
            <span className="block"><ContactReveal text={content.contactHeading} delay={0.1} reducedMotion={reduceMotion} /></span>
            <span className="block"><ContactReveal text={content.contactHeadingAccent} gradient delay={0.18} reducedMotion={reduceMotion} /></span>
          </h2>
          <motion.div aria-hidden="true" initial={false} whileInView={reduceMotion ? undefined : { scaleX: [0, 1], opacity: [0, 1] }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }} className="mx-auto mt-3 h-px w-24 origin-center bg-gradient-to-r from-cyan-300 via-violet-400 to-pink-400 shadow-[0_0_12px_rgba(167,139,250,0.5)]" />
          <motion.p {...reveal(0.25)} className="mx-auto mt-5 max-w-[58ch] text-base leading-[1.8] text-gray-400">{content.contactDescription}</motion.p>
        </header>
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <motion.div {...reveal(0.1)} className="relative min-w-0 lg:pt-3">
            <div aria-hidden="true" className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/5 text-cyan-200"><HiArrowUp size={23} className="rotate-45" /></div>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{content.contactDetailsHeading}</h3>
            <p className="mt-3 max-w-[42ch] text-sm leading-[1.8] text-gray-400">{content.contactDetailsText}</p>
            <div className="mt-7 space-y-0">
              {contactInfo.filter(info => info.value).map((info, index) => <div key={info.label} className="group flex items-center gap-4 border-b border-white/10 py-4">
                <span aria-hidden="true" className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${index % 2 ? "bg-violet-400/10 text-violet-300" : "bg-cyan-300/10 text-cyan-300"}`}><info.icon size={19} /></span>
                <div className="min-w-0 flex-1"><p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500">{info.label}</p>{info.href ? <a href={info.href} className="break-words text-sm font-medium text-gray-200 transition-colors hover:text-cyan-300 sm:text-base">{info.value}</a> : <p className="text-sm text-gray-200 sm:text-base">{info.value}</p>}</div>
                {info.href && <HiArrowRight aria-hidden="true" className="-rotate-45 text-gray-600 transition-colors group-hover:text-cyan-300" />}
              </div>)}
            </div>
            {socials.length > 0 && <div className="mt-5 flex flex-wrap items-center gap-3"><span className="mr-2 text-[10px] uppercase tracking-[0.15em] text-gray-500">Elsewhere</span>{socials.map(({ Icon, href, label }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit my ${label} profile`} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-white"><Icon size={17} /></a>)}</div>}
          </motion.div>

          <motion.div {...reveal(0.15)} className="relative min-w-0 rounded-[28px] border border-violet-300/20 bg-gradient-to-br from-[#111525]/95 via-[#11101c]/95 to-[#180f25]/95 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.3)] sm:p-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
            <div className="mb-6 flex items-start justify-between gap-4"><div><p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-violet-300">{content.contactFormEyebrow}</p><h3 className="text-2xl font-semibold tracking-tight text-white">{content.contactFormHeading}</h3></div><span aria-hidden="true" className="flex gap-1.5 pt-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" /><span className="h-1.5 w-1.5 rounded-full bg-violet-400" /><span className="h-1.5 w-1.5 rounded-full bg-pink-400" /></span></div>
            <form onSubmit={handleSubmit} aria-label="Send a message" aria-busy={loading} className="space-y-4 [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10 [&_input]:bg-black/20 [&_input]:px-4 [&_input]:py-3 [&_label]:mb-2 [&_label]:text-xs [&_label]:font-medium [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10 [&_textarea]:bg-black/20 [&_textarea]:px-4 [&_textarea]:py-3">
              <div className="absolute -left-[9999px]" aria-hidden="true"><label htmlFor="contact-website">Website</label><input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={event => setWebsite(event.target.value)} /></div>
              <div className="grid gap-4 sm:grid-cols-2"><Input label="Your name" name="name" autoComplete="name" placeholder="What should I call you?" value={formData.name} onChange={handleChange} minLength={2} required /><Input label="Your email" type="email" name="email" autoComplete="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required /></div>
              <Input label="Subject" name="subject" placeholder="What do you have in mind?" value={formData.subject} onChange={handleChange} minLength={3} required />
              <Input label="Your message" type="textarea" name="message" value={formData.message} onChange={handleChange} minLength={10} placeholder="A little about your idea, goals, or opportunity…" required />
              <button type="submit" aria-label={loading ? "Sending your message" : content.contactSubmitLabel} disabled={loading} className="group flex min-h-12 w-full items-center justify-between rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(99,102,241,0.2)] transition-shadow hover:shadow-[0_8px_35px_rgba(99,102,241,0.4)] disabled:cursor-wait disabled:opacity-60"><span role="status">{loading ? "Sending your message…" : content.contactSubmitLabel}</span><HiArrowRight aria-hidden="true" size={20} className="transition-transform group-hover:translate-x-1" /></button>
            </form>
            {whatsappHref && <p className="mt-5 text-center text-xs text-gray-500">Prefer a quick chat? <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="ml-1 inline-flex items-center gap-1.5 font-medium text-emerald-300 transition-colors hover:text-emerald-200"><FaWhatsapp aria-hidden="true" />Let’s talk on WhatsApp</a></p>}
          </motion.div>
        </div>
      </div>
      {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Contact me on WhatsApp" className="fixed bottom-6 right-6 z-50 hidden h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white transition-colors hover:bg-green-500 md:flex"><FaWhatsapp size={22} /></a>}
    </section>
  );
}
