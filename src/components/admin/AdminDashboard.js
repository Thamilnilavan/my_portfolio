"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  HiCheck,
  HiChevronRight,
  HiDatabase,
  HiExternalLink,
  HiKey,
  HiLogout,
  HiPencil,
  HiPlus,
  HiRefresh,
  HiTrash,
  HiX,
} from "react-icons/hi";
import { adminFields, adminSections, createEmptyRecord } from "@/content/adminFields";

function recordTitle(section, record) {
  if (section === "settings") return record?.name || "Site settings";
  return record?.title || record?.name || record?.role || "Untitled record";
}

function recordSubtitle(section, record) {
  if (section === "projects") return record.category;
  if (section === "experience") return record.company;
  if (section === "skills") return `${record.category || "Uncategorized"} · ${record.level || 0}%`;
  if (section === "services") return record.description;
  if (section === "gallery") return record.category;
  if (section === "testimonials") return record.role;
  return record.email;
}

export default function AdminDashboard({ adminEmail, databaseConfigured }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("settings");
  const [content, setContent] = useState(null);
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editor, setEditor] = useState(null);
  const [passwordEditor, setPasswordEditor] = useState(false);

  const loadContent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/content", { cache: "no-store" });
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to load content.");
      setContent(result.content);
      setSource(result.source);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        if (response.status === 401) {
          router.replace("/admin/login");
          return null;
        }
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Unable to load content.");
        return result;
      })
      .then((result) => {
        if (!cancelled && result) {
          setContent(result.content);
          setSource(result.source);
        }
      })
      .catch((loadError) => {
        if (!cancelled) setError(loadError.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  const records = useMemo(() => {
    if (!content) return [];
    if (activeSection === "settings") return content.settings ? [content.settings] : [];
    return content[activeSection] || [];
  }, [activeSection, content]);

  const databaseHasContent = content && Object.entries(content).some(([key, value]) =>
    key === "settings" ? Boolean(value) : Array.isArray(value) && value.length > 0
  );

  const request = async (method, body) => {
    setWorking(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "The change could not be saved.");
      return result;
    } catch (requestError) {
      setError(requestError.message);
      return null;
    } finally {
      setWorking(false);
    }
  };

  const seedDatabase = async () => {
    const result = await request("POST", { action: "seed" });
    if (result) {
      setContent(result.content);
      setSource("mongodb");
      setNotice("Your current portfolio content was copied to MongoDB.");
    }
  };

  const openNew = () => {
    setEditor({ mode: "create", data: createEmptyRecord(activeSection) });
  };

  const openEdit = (record) => {
    setEditor({ mode: "edit", data: structuredClone(record) });
  };

  const saveRecord = async (event) => {
    event.preventDefault();
    const isCreate = editor.mode === "create";
    const result = await request(isCreate ? "POST" : "PUT", {
      collection: activeSection,
      id: editor.data.id,
      data: editor.data,
    });
    if (result) {
      setEditor(null);
      setNotice(`${adminSections[activeSection].singular} saved successfully.`);
      await loadContent();
    }
  };

  const togglePublished = async (record) => {
    const result = await request("PUT", {
      collection: activeSection,
      id: record.id,
      data: { ...record, isPublished: !record.isPublished },
    });
    if (result) await loadContent();
  };

  const removeRecord = async (record) => {
    if (!window.confirm(`Delete “${recordTitle(activeSection, record)}”? This cannot be undone.`)) return;
    const result = await request("DELETE", { collection: activeSection, id: record.id });
    if (result) {
      setNotice("Record deleted.");
      await loadContent();
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-[#050508] text-white">
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.09),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(0,212,255,0.07),transparent_35%)]" />
      <div className="relative mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-black/15 p-6 lg:flex lg:flex-col">
          <Link href="/" className="text-2xl font-black tracking-tight">THA<span className="text-cyan-400">MIL</span></Link>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-gray-600">Content studio</p>
          <nav className="mt-10 space-y-1">
            {Object.entries(adminSections).map(([key, section]) => (
              <button key={key} onClick={() => setActiveSection(key)} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${activeSection === key ? "bg-gradient-to-r from-cyan-400/15 to-purple-500/10 text-cyan-300" : "text-gray-500 hover:bg-white/5 hover:text-white"}`}>
                {section.label}<HiChevronRight />
              </button>
            ))}
          </nav>
          <div className="mt-auto border-t border-white/10 pt-5">
            <p className="truncate text-xs text-gray-600">{adminEmail}</p>
            <button onClick={() => setPasswordEditor(true)} className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-cyan-300"><HiKey /> Change password</button>
            <button onClick={logout} className="mt-3 flex items-center gap-2 text-sm font-semibold text-gray-400 transition hover:text-red-300"><HiLogout /> Sign out</button>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-5 sm:px-8 sm:py-8 lg:px-12">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">Admin dashboard</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Manage your portfolio</h1>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" target="_blank" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white">View site <HiExternalLink /></Link>
              <button onClick={() => setPasswordEditor(true)} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-gray-400 transition hover:text-cyan-300" aria-label="Change password"><HiKey /></button>
              <button onClick={logout} aria-label="Sign out" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-gray-400 lg:hidden"><HiLogout /></button>
            </div>
          </header>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:hidden">
            {Object.entries(adminSections).map(([key, section]) => (
              <button key={key} onClick={() => setActiveSection(key)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold ${activeSection === key ? "bg-cyan-400/15 text-cyan-300" : "bg-white/5 text-gray-500"}`}>{section.label}</button>
            ))}
          </div>

          {(!databaseConfigured || source === "local-preview") && (
            <div className="mt-6 rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
              <div className="flex items-start gap-3"><HiDatabase className="mt-0.5 shrink-0 text-amber-300" size={22} /><div><h2 className="font-bold text-amber-200">MongoDB connection required</h2><p className="mt-1 text-sm leading-6 text-amber-100/70">The dashboard is showing a safe local preview. Add a valid <code>MONGODB_URI</code> and <code>MONGODB_DB</code> to your environment to enable editing.</p></div></div>
            </div>
          )}

          {databaseConfigured && source === "mongodb" && !databaseHasContent && (
            <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 sm:flex sm:items-center sm:justify-between">
              <div><h2 className="font-bold text-cyan-200">Your database is empty</h2><p className="mt-1 text-sm text-cyan-100/60">Copy the current portfolio content into MongoDB to begin editing.</p></div>
              <button disabled={working} onClick={seedDatabase} className="mt-4 rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-black disabled:opacity-50 sm:mt-0">Import current content</button>
            </div>
          )}

          {(error || notice) && <div role="status" className={`mt-6 flex items-center justify-between rounded-xl border p-4 text-sm ${error ? "border-red-400/20 bg-red-400/10 text-red-300" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"}`}><span>{error || notice}</span><button onClick={() => { setError(""); setNotice(""); }}><HiX /></button></div>}

          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <div><p className="text-sm font-semibold text-cyan-400">{adminSections[activeSection].label}</p><h2 className="mt-1 text-2xl font-black">{records.length} {records.length === 1 ? "record" : "records"}</h2></div>
            <div className="flex gap-2">
              <button onClick={loadContent} disabled={loading} className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-gray-400 transition hover:text-white disabled:opacity-50" aria-label="Refresh content"><HiRefresh className={loading ? "animate-spin" : ""} /></button>
              {(activeSection !== "settings" || records.length === 0) && <button onClick={openNew} disabled={!databaseConfigured} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-40"><HiPlus /> Add {adminSections[activeSection].singular}</button>}
            </div>
          </div>

          {loading ? (
            <div className="mt-8 grid gap-4 md:grid-cols-2"><div className="h-40 animate-pulse rounded-2xl bg-white/5" /><div className="h-40 animate-pulse rounded-2xl bg-white/5" /></div>
          ) : records.length ? (
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {records.map((record) => (
                <article key={record.id} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-400/25 hover:bg-white/[0.05]">
                  <div className="flex items-start justify-between gap-4"><div className="min-w-0"><h3 className="truncate font-bold text-white">{recordTitle(activeSection, record)}</h3><p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-500">{recordSubtitle(activeSection, record) || "No additional details"}</p></div>{activeSection !== "settings" && <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${record.isPublished ? "bg-emerald-400/10 text-emerald-300" : "bg-gray-400/10 text-gray-500"}`}>{record.isPublished ? "Published" : "Draft"}</span>}</div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4"><button disabled={!databaseConfigured} onClick={() => openEdit(record)} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-xs font-bold text-gray-300 hover:bg-white/10 disabled:opacity-40"><HiPencil /> Edit</button>{activeSection !== "settings" && <><button disabled={!databaseConfigured} onClick={() => togglePublished(record)} className="grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-gray-400 hover:text-cyan-300 disabled:opacity-40" aria-label={record.isPublished ? "Unpublish" : "Publish"}><HiCheck /></button><button disabled={!databaseConfigured} onClick={() => removeRecord(record)} className="grid h-9 w-9 place-items-center rounded-lg bg-red-400/5 text-red-400/70 hover:bg-red-400/10 hover:text-red-300 disabled:opacity-40" aria-label="Delete"><HiTrash /></button></>}</div>
                </article>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center"><p className="font-semibold text-gray-400">No records in this section yet.</p><p className="mt-2 text-sm text-gray-600">Add the first record when your database is connected.</p></div>
          )}
        </section>
      </div>

      {editor && <RecordEditor section={activeSection} editor={editor} setEditor={setEditor} setData={(data) => setEditor({ ...editor, data })} onSave={saveRecord} working={working} />}
      {passwordEditor && <PasswordEditor onClose={() => setPasswordEditor(false)} onSuccess={(message) => { setPasswordEditor(false); setNotice(message); setError(""); }} />}
    </main>
  );
}

function PasswordEditor({ onClose, onSuccess }) {
  const router = useRouter();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    setFormError("");
    if (form.newPassword !== form.confirmPassword) {
      setFormError("The new passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.currentPassword, newPassword: form.newPassword }),
      });
      const result = await response.json();
      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (!response.ok) throw new Error(result.error || "Unable to change your password.");
      onSuccess("Admin password changed successfully.");
    } catch (error) {
      setFormError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const fields = [["currentPassword", "Current password"], ["newPassword", "New password"], ["confirmPassword", "Confirm new password"]];

  return (
    <div className="fixed inset-0 z-[310] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-5">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close password editor" />
      <form onSubmit={submit} className="relative w-full max-w-lg rounded-t-3xl border border-white/10 bg-[#0b0b13] p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Security</p><h2 className="mt-2 text-2xl font-black">Change admin password</h2></div><button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-gray-400 hover:text-white"><HiX /></button></div>
        <p className="mt-3 text-sm leading-6 text-gray-500">Enter your current password, then choose a new password with at least 10 characters.</p>
        {formError && <div role="alert" className="mt-5 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300">{formError}</div>}
        <div className="mt-6 space-y-4">
          {fields.map(([key, label]) => <label key={key} className="block"><span className="mb-2 block text-sm font-semibold text-gray-300">{label}</span><input type="password" required minLength={key === "currentPassword" ? 1 : 10} maxLength={128} autoComplete={key === "currentPassword" ? "current-password" : "new-password"} value={form[key]} onChange={(event) => update(key, event.target.value)} className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-none focus:border-cyan-400/50" /></label>)}
        </div>
        <div className="mt-7 flex justify-end gap-3 border-t border-white/10 pt-6"><button type="button" onClick={onClose} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-gray-400 hover:text-white">Cancel</button><button disabled={saving} className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-bold disabled:opacity-50">{saving ? "Updating…" : "Update password"}</button></div>
      </form>
    </div>
  );
}

function RecordEditor({ section, editor, setEditor, setData, onSave, working }) {
  const update = (key, value, type) => {
    let nextValue = value;
    if (type === "number") nextValue = Number(value);
    if (type === "array") nextValue = value.split(",").map((item) => item.trim()).filter(Boolean);
    if (type === "boolean") nextValue = value;
    setData({ ...editor.data, [key]: nextValue });
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-end justify-center bg-black/80 p-0 backdrop-blur-md sm:items-center sm:p-5">
      <button className="absolute inset-0 cursor-default" onClick={() => setEditor(null)} aria-label="Close editor" />
      <form onSubmit={onSave} className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#0b0b13] p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{editor.mode === "create" ? "Create" : "Edit"}</p><h2 className="mt-2 text-2xl font-black">{adminSections[section].singular}</h2></div><button type="button" onClick={() => setEditor(null)} className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-gray-400 hover:text-white"><HiX /></button></div>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {adminFields[section].map(([key, label, type = "text"]) => (
            <label key={key} className={type === "textarea" || type === "array" ? "sm:col-span-2" : ""}>
              <span className="mb-2 block text-sm font-semibold text-gray-300">{label}</span>
              {type === "boolean" ? (
                <button type="button" role="switch" aria-checked={Boolean(editor.data[key])} onClick={() => update(key, !editor.data[key], type)} className={`flex h-12 w-full items-center justify-between rounded-xl border px-4 ${editor.data[key] ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300" : "border-white/10 bg-white/5 text-gray-500"}`}><span>{editor.data[key] ? "Published" : "Draft"}</span><span className={`h-6 w-11 rounded-full p-1 ${editor.data[key] ? "bg-emerald-400" : "bg-gray-700"}`}><span className={`block h-4 w-4 rounded-full bg-white transition ${editor.data[key] ? "translate-x-5" : ""}`} /></span></button>
              ) : type === "textarea" ? (
                <textarea required value={editor.data[key] ?? ""} onChange={(event) => update(key, event.target.value, type)} rows={5} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-cyan-400/50" />
              ) : (
                <input type={type === "array" ? "text" : type} required={!['github','liveUrl','avatar'].includes(key)} value={type === "array" ? (editor.data[key] || []).join(", ") : editor.data[key] ?? ""} onChange={(event) => update(key, event.target.value, type)} className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 outline-none focus:border-cyan-400/50" />
              )}
            </label>
          ))}
        </div>
        <div className="mt-8 flex justify-end gap-3 border-t border-white/10 pt-6"><button type="button" onClick={() => setEditor(null)} className="rounded-xl border border-white/10 px-5 py-3 text-sm font-bold text-gray-400 hover:text-white">Cancel</button><button disabled={working} className="rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-bold disabled:opacity-50">{working ? "Saving…" : "Save changes"}</button></div>
      </form>
    </div>
  );
}
