"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HiLockClosed, HiMail, HiShieldCheck } from "react-icons/hi";

export default function AdminLogin({ configured }) {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to sign in.");
      router.replace("/admin");
      router.refresh();
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050508] px-5 py-12 text-white flex items-center justify-center">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(0,212,255,0.12),transparent_45%)]" />
      <section className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#0b0b13]/90 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-9">
        <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 shadow-[0_0_35px_rgba(0,212,255,0.25)]">
          <HiShieldCheck size={28} />
        </div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Private area</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Portfolio Admin</h1>
        <p className="mt-3 text-sm leading-6 text-gray-400">Sign in to manage your portfolio content securely.</p>

        {!configured ? (
          <div className="mt-7 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-200">
            Admin login is not configured. Add the three ADMIN environment variables from <code>.env.example</code>, then restart or redeploy.
          </div>
        ) : (
          <form onSubmit={submit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-300">Email</span>
              <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/50">
                <HiMail className="text-gray-500" />
                <input type="email" required autoComplete="username" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-12 w-full bg-transparent outline-none placeholder:text-gray-700" placeholder="admin@example.com" />
              </span>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-gray-300">Password</span>
              <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 focus-within:border-cyan-400/50">
                <HiLockClosed className="text-gray-500" />
                <input type="password" required autoComplete="current-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="h-12 w-full bg-transparent outline-none placeholder:text-gray-700" placeholder="Your admin password" />
              </span>
            </label>
            {error && <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">{error}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3.5 font-bold transition hover:opacity-90 disabled:opacity-50">
              {loading ? "Signing in…" : "Sign in securely"}
            </button>
          </form>
        )}
        <Link href="/" className="mt-7 block text-center text-sm text-gray-500 transition hover:text-cyan-300">← Return to portfolio</Link>
      </section>
    </main>
  );
}
