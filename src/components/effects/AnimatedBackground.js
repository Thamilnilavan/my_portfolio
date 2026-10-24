export default function AnimatedBackground() {
  return <div aria-hidden="true" className="site-atmosphere fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[var(--bg-primary)]">
    <div className="atmosphere-orb atmosphere-orb-violet" />
    <div className="atmosphere-orb atmosphere-orb-cyan" />
    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
  </div>;
}
