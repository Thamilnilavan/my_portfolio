"use client";
import { motion } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { settings } from "@/data/settings";

export default function Footer() {
  const s = settings;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { Icon: FaGithub, href: s.github },
    { Icon: FaLinkedin, href: s.linkedin },
    { Icon: FaTwitter, href: s.twitter },
    { Icon: FaInstagram, href: s.instagram },
  ].filter((item) => item.href);

  return (
    <footer className="relative border-t border-white/10 bg-[#0A0A0A] pt-16 pb-8 overflow-hidden">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12 items-center">
          
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="text-3xl font-bold tracking-tighter mb-4">
              <span className="text-white">THAMIL</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700]">NILAVAN</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs mx-auto md:mx-0">
              Building premium digital experiences that inspire and perform.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center gap-8 text-sm font-medium">
            {["Home", "About", "Contact"].map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`}
                className="text-gray-400 hover:text-[#00D4FF] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Socials & Top Button */}
          <div className="flex items-center justify-center md:justify-end gap-6">
            {socialLinks.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#00D4FF] transition-colors"
              >
                <Icon size={20} />
              </a>
            ))}
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors ml-4 border border-white/10"
            >
              <HiArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Thamilnilavan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
