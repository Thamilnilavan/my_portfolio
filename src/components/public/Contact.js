"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "../ui/SectionHeader";
import GlassCard from "../ui/GlassCard";
import Input from "../ui/Input";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import { FaWhatsapp, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import toast from "react-hot-toast";
import { usePortfolioContent } from "@/components/providers/PortfolioContentProvider";

export default function Contact() {
  const { settings: s } = usePortfolioContent();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section id="contact" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <SectionHeader
          subtitle="Get in Touch"
          title="Let's Work Together"
          description="Have a project in mind? Let's discuss how we can build something amazing together."
          className="!mb-10"
        />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Contact Form - Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="Your Name" name="name" value={formData.name} onChange={handleChange} minLength={2} required />
                  <Input label="Your Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <Input label="Subject" name="subject" value={formData.subject} onChange={handleChange} minLength={3} required />
                <Input
                  label="Message"
                  type="textarea"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  minLength={10}
                  placeholder="Tell me about your project or opportunity..."
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 px-6 bg-white/5 border border-white/10 text-white font-medium text-sm rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info - Right */}
          <div className="space-y-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                    <info.icon size={18} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-gray-200 text-sm font-medium hover:text-cyan-400 transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-200 text-sm font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {socials.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="pt-2"
              >
                <p className="text-gray-500 text-[11px] font-medium uppercase tracking-wider mb-3">Follow me</p>
                <div className="flex gap-2">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${label} profile`}
                      className="w-9 h-9 rounded-lg border border-white/5 bg-white/[0.02] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300"
                    >
                      <Icon size={15} />
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {whatsappHref && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact me on WhatsApp"
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center z-50 hover:bg-green-500 transition-colors duration-300 hidden md:flex"
        >
          <FaWhatsapp size={22} />
        </a>
      )}
    </section>
  );
}
