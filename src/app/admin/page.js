"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { useProjects } from "@/hooks/useProjects";
import { useSkills } from "@/hooks/useSkills";
import { useExperiences } from "@/hooks/useExperiences";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useMessages } from "@/hooks/useMessages";
import { useGallerys } from "@/hooks/useGallerys";
import { useServices } from "@/hooks/useServices";
import {
  HiOutlineCode,
  HiOutlineMail,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlinePhotograph,
  HiOutlineCog,
  HiOutlineArrowRight,
  HiOutlineBadgeCheck,
  HiStar,
} from "react-icons/hi";

const quickLinks = [
  { name: "Add Project", href: "/admin/projects", desc: "Showcase your latest work", icon: HiOutlineCode },
  { name: "Site Settings", href: "/admin/settings", desc: "Name, bio, contact & socials", icon: HiOutlineCog },
  { name: "View Messages", href: "/admin/messages", desc: "Read client inquiries", icon: HiOutlineMail },
  { name: "Manage Gallery", href: "/admin/gallery", desc: "Upload portfolio photos", icon: HiOutlinePhotograph },
];

export default function AdminDashboard() {
  const { projects, loading: lp } = useProjects();
  const { skills, loading: ls } = useSkills();
  const { experiences, loading: le } = useExperiences();
  const { testimonials, loading: lt } = useTestimonials();
  const { messages, loading: lm } = useMessages();
  const { gallerys, loading: lg } = useGallerys();
  const { services, loading: lsv } = useServices();

  const loading = lp || ls || le || lt || lm || lg || lsv;
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { name: "Projects", value: projects.length, icon: HiOutlineCode, color: "from-[#00D4FF] to-[#00A8CC]", href: "/admin/projects", max: 20 },
    { name: "Skills", value: skills.length, icon: HiOutlineSparkles, color: "from-[#7C3AED] to-[#5B21B6]", href: "/admin/skills", max: 30 },
    { name: "Experience", value: experiences.length, icon: HiOutlineBriefcase, color: "from-[#FFD700] to-[#FFA500]", href: "/admin/experience", max: 10 },
    { name: "Messages", value: messages.length, icon: HiOutlineMail, color: "from-[#00D4FF] to-[#7C3AED]", href: "/admin/messages", badge: unread, max: 50 },
    { name: "Testimonials", value: testimonials.length, icon: HiOutlineUserGroup, color: "from-[#7C3AED] to-[#FFD700]", href: "/admin/testimonials", max: 20 },
    { name: "Gallery", value: gallerys.length, icon: HiOutlinePhotograph, color: "from-[#FFD700] to-[#FF6B6B]", href: "/admin/gallery", max: 30 },
    { name: "Services", value: services.length, icon: HiOutlineCog, color: "from-[#00D4FF] to-[#7C3AED]", href: "/admin/services", max: 10 },
  ];

  // Calculate overall progress
  const totalMax = stats.reduce((acc, stat) => acc + stat.max, 0);
  const totalValue = stats.reduce((acc, stat) => acc + stat.value, 0);
  const overallProgress = Math.min((totalValue / totalMax) * 100, 100);

  return (
    <div>
      <AdminPageHeader
        title="Command Center"
        description="Manage your portfolio like a pro. Track your progress and unlock achievements."
      />

      {loading ? (
        <div className="text-center text-gray-400 py-16">Loading your portfolio data...</div>
      ) : (
        <>
          {/* Character Stats Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GlassCard className="!p-6 border-[#00D4FF]/30 shadow-[0_0_30px_rgba(0,212,255,0.15)]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-white mb-1">PORTFOLIO LEVEL</h2>
                  <p className="text-gray-400 text-sm">Complete content to level up your profile</p>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] glow-text">
                    {Math.floor(overallProgress)}%
                  </div>
                  <div className="text-xs text-gray-500">COMPLETION RATE</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-[#00D4FF] via-[#7C3AED] to-[#FFD700] relative"
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                </motion.div>
              </div>

              {/* Achievement Badges */}
              <div className="flex items-center gap-4 mt-4">
                {overallProgress >= 25 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#00D4FF]/20 border border-[#00D4FF]/50 rounded-full">
                    <HiStar className="text-[#00D4FF]" size={16} />
                    <span className="text-xs text-[#00D4FF] font-bold">NOVICE</span>
                  </div>
                )}
                {overallProgress >= 50 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#7C3AED]/20 border border-[#7C3AED]/50 rounded-full">
                    <HiOutlineBadgeCheck className="text-[#7C3AED]" size={16} />
                    <span className="text-xs text-[#7C3AED] font-bold">ADEPT</span>
                  </div>
                )}
                {overallProgress >= 75 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/50 rounded-full">
                    <HiOutlineBadgeCheck className="text-[#FFD700]" size={16} />
                    <span className="text-xs text-[#FFD700] font-bold">MASTER</span>
                  </div>
                )}
                {overallProgress >= 100 && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] border border-white/50 rounded-full">
                    <HiStar className="text-white" size={16} />
                    <span className="text-xs text-white font-bold">LEGENDARY</span>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {unread > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link href="/admin/messages">
                <div className="p-4 rounded-xl border border-[#00D4FF]/30 bg-[#00D4FF]/10 flex items-center justify-between hover:bg-[#00D4FF]/15 transition-colors cursor-pointer neon-border-glow">
                  <p className="text-[#00D4FF] font-medium">
                    You have {unread} unread message{unread !== 1 ? "s" : ""}
                  </p>
                  <HiOutlineArrowRight className="text-[#00D4FF]" size={20} />
                </div>
              </Link>
            </motion.div>
          )}

          {/* Skill Tree Style Stats */}
          <h2 className="text-xl font-black mb-4 text-white">SKILL TREE</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={stat.href}>
                  <GlassCard className="!p-5 hover:border-[#00D4FF]/30 transition-colors cursor-pointer h-full group">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                        <stat.icon size={24} />
                      </div>
                      {stat.badge > 0 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/30 font-bold">
                          {stat.badge} NEW
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-black text-white mb-1 group-hover:text-[#00D4FF] transition-colors">{stat.name}</h3>
                    
                    {/* XP Bar */}
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                        <span>XP</span>
                        <span>{stat.value}/{stat.max}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min((stat.value / stat.max) * 100, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>

                    <div className="text-2xl font-black text-white">{stat.value}</div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>

          <h2 className="text-xl font-black mb-4 text-white">QUICK ACTIONS</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <GlassCard className="!p-5 flex items-center justify-between group hover:border-[#00D4FF]/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center text-white">
                        <link.icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-white group-hover:text-[#00D4FF] transition-colors">{link.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{link.desc}</p>
                      </div>
                    </div>
                    <HiOutlineArrowRight className="text-gray-500 group-hover:text-[#00D4FF] transition-colors" size={20} />
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
