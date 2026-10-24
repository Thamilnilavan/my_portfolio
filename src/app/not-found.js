import Link from "next/link";
export const metadata = { title: "Page not found", robots: { index: false, follow: true } };
export default function NotFound() {
  return <main id="main-content" tabIndex={-1} className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6">
    <h1 className="text-4xl font-bold">Page not found</h1>
    <p className="text-gray-300">This page does not exist. Explore my portfolio or get in touch.</p>
    <nav aria-label="Page recovery" className="flex gap-6"><Link href="/">Home</Link><Link href="/#projects">Projects</Link><Link href="/#contact">Contact</Link></nav>
  </main>;
}
