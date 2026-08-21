"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Plus, Pencil, Trash2, Copy, ChevronUp, ChevronDown,
  Save, X, Download, Upload, Eye, EyeOff, Star, StarOff,
  ExternalLink, AlertCircle, CheckCircle2, RefreshCw,
} from "lucide-react";
import type { Project } from "@/lib/validation/project-schema";
import { PROJECT_CATEGORIES } from "@/lib/validation/project-schema";

// ----- Types -----
type Tab = "list" | "form" | "json";
type Toast = { id: number; message: string; type: "success" | "error" };

const BLANK_PROJECT: Omit<Project, "id"> = {
  slug: "",
  title: "",
  shortDescription: "",
  description: "",
  category: "Web Development",
  industry: "",
  featured: false,
  published: false,
  order: 0,
  year: new Date().getFullYear(),
  technologies: [],
  image: "",
  gallery: [],
  liveUrl: "",
  githubUrl: "",
  client: "",
  challenge: "",
  solution: "",
  results: [],
};

// ----- Toast helper -----
let toastCounter = 0;

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onRemove(toast.id), 3800);
    return () => clearTimeout(t);
  }, [toast.id, onRemove]);

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium max-w-sm ${
        toast.type === "success"
          ? "bg-emerald-900/90 text-emerald-100 border border-emerald-700"
          : "bg-red-900/90 text-red-100 border border-red-700"
      }`}
    >
      {toast.type === "success" ? (
        <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5 text-emerald-400" />
      ) : (
        <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-red-400" />
      )}
      <span>{toast.message}</span>
      <button onClick={() => onRemove(toast.id)} className="ml-auto flex-shrink-0 opacity-60 hover:opacity-100">
        <X size={14} />
      </button>
    </div>
  );
}

// ----- Form helpers -----
function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/60 uppercase tracking-wider mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full bg-white/5 border border-white/15 text-white placeholder-white/25 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors";

// ----- Project Form -----
function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Project;
  onSave: (data: Omit<Project, "id"> & { id?: string }) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Omit<Project, "id"> & { id?: string }>(
    initial ?? BLANK_PROJECT
  );
  const [techInput, setTechInput] = useState(initial?.technologies.join(", ") ?? "");
  const [resultInput, setResultInput] = useState(initial?.results.join("\n") ?? "");
  const [galleryInput, setGalleryInput] = useState(initial?.gallery.join("\n") ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required.";
    if (!form.slug.trim()) e.slug = "Slug is required.";
    if (!/^[a-z0-9-]+$/.test(form.slug)) e.slug = "Only lowercase letters, numbers, and hyphens.";
    if (!form.shortDescription.trim()) e.shortDescription = "Short description is required.";
    if (!form.description.trim()) e.description = "Description is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await onSave({
        ...form,
        technologies: techInput.split(",").map((s) => s.trim()).filter(Boolean),
        results: resultInput.split("\n").map((s) => s.trim()).filter(Boolean),
        gallery: galleryInput.split("\n").map((s) => s.trim()).filter(Boolean),
      });
    } finally {
      setSaving(false);
    }
  };

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Title" required error={errors.title}>
          <input
            className={inputCls}
            value={form.title}
            onChange={(e) => {
              set("title", e.target.value);
              if (!initial) set("slug", autoSlug(e.target.value));
            }}
            placeholder="Retail E-Commerce Platform"
          />
        </Field>

        <Field label="Slug (URL)" required error={errors.slug}>
          <input
            className={inputCls}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
            placeholder="retail-ecommerce-platform"
          />
        </Field>

        <Field label="Category" required>
          <select
            className={inputCls}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Industry">
          <input
            className={inputCls}
            value={form.industry}
            onChange={(e) => set("industry", e.target.value)}
            placeholder="Retail"
          />
        </Field>

        <Field label="Year" required>
          <input
            className={inputCls}
            type="number"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
            min={2000}
            max={2099}
          />
        </Field>

        <Field label="Client">
          <input
            className={inputCls}
            value={form.client}
            onChange={(e) => set("client", e.target.value)}
            placeholder="Acme Corp"
          />
        </Field>

        <Field label="Order (for sorting)">
          <input
            className={inputCls}
            type="number"
            value={form.order}
            onChange={(e) => set("order", Number(e.target.value))}
          />
        </Field>

        <div className="flex flex-col justify-end gap-3 pb-0.5">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 rounded accent-primary"
            />
            <span className="text-sm text-white/80">Featured project</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => set("published", e.target.checked)}
              className="w-4 h-4 rounded accent-primary"
            />
            <span className="text-sm text-white/80">Published (visible on site)</span>
          </label>
        </div>
      </div>

      <Field label="Short Description (shown on cards)" required error={errors.shortDescription}>
        <input
          className={inputCls}
          value={form.shortDescription}
          onChange={(e) => set("shortDescription", e.target.value)}
          placeholder="A one-sentence description of the project."
        />
      </Field>

      <Field label="Full Description" required error={errors.description}>
        <textarea
          className={`${inputCls} h-32 resize-y`}
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Detailed project description. Separate paragraphs with a blank line."
        />
      </Field>

      <Field label="Challenge">
        <textarea
          className={`${inputCls} h-24 resize-y`}
          value={form.challenge}
          onChange={(e) => set("challenge", e.target.value)}
          placeholder="What was the core challenge or problem?"
        />
      </Field>

      <Field label="Solution">
        <textarea
          className={`${inputCls} h-24 resize-y`}
          value={form.solution}
          onChange={(e) => set("solution", e.target.value)}
          placeholder="How did DigitalYarr solve it?"
        />
      </Field>

      <Field label="Results (one per line)">
        <textarea
          className={`${inputCls} h-24 resize-y`}
          value={resultInput}
          onChange={(e) => setResultInput(e.target.value)}
          placeholder={"40% increase in conversion rate\n2x faster page load"}
        />
      </Field>

      <Field label="Technologies (comma-separated)">
        <input
          className={inputCls}
          value={techInput}
          onChange={(e) => setTechInput(e.target.value)}
          placeholder="React, Next.js, PostgreSQL, AWS"
        />
      </Field>

      <Field label="Cover Image URL">
        <input
          className={inputCls}
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          placeholder="https://..."
          type="url"
        />
      </Field>

      <Field label="Gallery Image URLs (one per line)">
        <textarea
          className={`${inputCls} h-20 resize-y`}
          value={galleryInput}
          onChange={(e) => setGalleryInput(e.target.value)}
          placeholder={"https://...\nhttps://..."}
        />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Live URL">
          <input
            className={inputCls}
            value={form.liveUrl}
            onChange={(e) => set("liveUrl", e.target.value)}
            placeholder="https://..."
            type="url"
          />
        </Field>
        <Field label="GitHub URL">
          <input
            className={inputCls}
            value={form.githubUrl}
            onChange={(e) => set("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            type="url"
          />
        </Field>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          <Save size={15} />
          {saving ? "Saving…" : initial ? "Save Changes" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 text-sm font-medium text-white/60 hover:text-white border border-white/15 hover:border-white/30 rounded-xl transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ----- JSON Editor -----
function JsonEditor({
  projects,
  onSave,
}: {
  projects: Project[];
  onSave: (projects: Project[]) => Promise<void>;
}) {
  const [raw, setRaw] = useState(() => JSON.stringify({ projects }, null, 2));
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const validate = (): Project[] | null => {
    try {
      const parsed = JSON.parse(raw) as { projects?: unknown };
      if (!parsed.projects || !Array.isArray(parsed.projects)) {
        setError('JSON must have a "projects" array at the top level.');
        return null;
      }
      setError(null);
      return parsed.projects as Project[];
    } catch (e) {
      setError(`JSON parse error: ${String(e)}`);
      return null;
    }
  };

  const handleSave = async () => {
    const parsed = validate();
    if (!parsed) return;
    setSaving(true);
    try {
      await onSave(parsed);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setRaw(JSON.stringify({ projects }, null, 2));
    setError(null);
  };

  const handleDownload = () => {
    const blob = new Blob([raw], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "projects.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setRaw(ev.target?.result as string);
      setError(null);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSave}
          disabled={saving || !!error}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          <Save size={14} />
          {saving ? "Saving…" : "Save JSON"}
        </button>
        <button
          onClick={handleReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors"
        >
          <RefreshCw size={14} />
          Reset
        </button>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors"
        >
          <Download size={14} />
          Download
        </button>
        <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors cursor-pointer">
          <Upload size={14} />
          Upload
          <input type="file" accept=".json" onChange={handleUpload} className="sr-only" />
        </label>
        <a
          href="/work"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors ml-auto"
        >
          <ExternalLink size={14} />
          Preview /work
        </a>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-red-900/30 border border-red-700/50 text-red-300 text-sm">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <textarea
        value={raw}
        onChange={(e) => {
          setRaw(e.target.value);
          if (error) validate();
        }}
        className="w-full h-[60vh] font-mono text-xs bg-white/4 border border-white/10 text-green-300 rounded-2xl p-5 resize-y focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 transition-colors"
        spellCheck={false}
        aria-label="Raw JSON editor"
      />

      <p className="text-xs text-white/30">
        Schema: each project needs <code className="text-white/50">id</code>,{" "}
        <code className="text-white/50">slug</code>,{" "}
        <code className="text-white/50">title</code>,{" "}
        <code className="text-white/50">shortDescription</code>,{" "}
        <code className="text-white/50">description</code>,{" "}
        <code className="text-white/50">category</code>,{" "}
        <code className="text-white/50">year</code> (number). All other fields are optional.
      </p>
    </div>
  );
}

// ----- Main admin view -----
export default function AdminProjectsView() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("list");
  const [editing, setEditing] = useState<Project | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast["type"]) => {
    const id = ++toastCounter;
    setToasts((t) => [...t, { id, message, type }]);
  };

  const removeToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { projects: Project[] };
      setProjects(data.projects ?? []);
    } catch (e) {
      addToast(`Failed to load projects: ${String(e)}`, "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  // - CRUD -

  const handleCreate = async (data: Omit<Project, "id"> & { id?: string }) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      addToast(err.error ?? "Create failed.", "error");
      return;
    }
    addToast("Project created.", "success");
    setTab("list");
    setEditing(null);
    await fetchProjects();
  };

  const handleUpdate = async (data: Omit<Project, "id"> & { id?: string }) => {
    if (!editing) return;
    const res = await fetch(`/api/projects/${editing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, id: editing.id }),
    });
    if (!res.ok) {
      const err = (await res.json()) as { error?: string };
      addToast(err.error ?? "Update failed.", "error");
      return;
    }
    addToast("Project updated.", "success");
    setTab("list");
    setEditing(null);
    await fetchProjects();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!res.ok) {
      addToast("Delete failed.", "error");
      return;
    }
    addToast("Project deleted.", "success");
    await fetchProjects();
  };

  const handleDuplicate = async (id: string) => {
    const res = await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "duplicate" }),
    });
    if (!res.ok) {
      addToast("Duplicate failed.", "error");
      return;
    }
    addToast("Project duplicated.", "success");
    await fetchProjects();
  };

  const handleToggle = async (project: Project, field: "published" | "featured") => {
    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !project[field] }),
    });
    if (!res.ok) {
      addToast("Update failed.", "error");
      return;
    }
    setProjects((ps) =>
      ps.map((p) => (p.id === project.id ? { ...p, [field]: !p[field] } : p))
    );
  };

  const handleMove = async (index: number, dir: -1 | 1) => {
    const next = [...projects];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setProjects(next);
    await fetch("/api/projects/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: next.map((p) => p.id) }),
    });
  };

  const handleJsonSave = async (updated: Project[]) => {
    const res = await fetch("/api/projects/import", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projects: updated }),
    });
    if (!res.ok) {
      const err = (await res.json()) as { error?: string; issues?: { path: string; message: string }[] };
      const detail = err.issues?.map((i) => `${i.path}: ${i.message}`).join("; ") ?? err.error;
      addToast(`Save failed: ${detail}`, "error");
      return;
    }
    addToast("projects.json saved.", "success");
    await fetchProjects();
  };

  // - UI -

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* Toasts */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Link href="/" className="text-white/40 hover:text-white text-sm transition-colors">
                DigitalYarr
              </Link>
              <span className="text-white/20 text-sm">/</span>
              <span className="text-white/60 text-sm">Admin</span>
              <span className="text-white/20 text-sm">/</span>
              <span className="text-white text-sm font-medium">Projects</span>
            </div>
            <h1 className="text-3xl font-bold text-white">Portfolio Manager</h1>
            <p className="text-white/50 text-sm mt-1">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in projects.json
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/projects/export"
              download="projects.json"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-colors"
            >
              <Download size={14} />
              Export JSON
            </a>
            <button
              onClick={() => {
                setEditing(null);
                setTab("form");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors"
            >
              <Plus size={16} />
              Add Project
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10 mb-8">
          {(["list", "form", "json"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? "border-primary text-white"
                  : "border-transparent text-white/50 hover:text-white"
              }`}
            >
              {t === "list" ? "All Projects" : t === "form" ? (editing ? "Edit Project" : "New Project") : "Raw JSON"}
            </button>
          ))}
        </div>

        {/* Tab: List */}
        {tab === "list" && (
          <div>
            {loading ? (
              <div className="flex items-center justify-center h-40 text-white/40 text-sm">
                Loading…
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-white/40 text-sm mb-4">No projects yet.</p>
                <button
                  onClick={() => { setEditing(null); setTab("form"); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  <Plus size={15} />
                  Add First Project
                </button>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/3">
                      <th className="text-left px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider">Order</th>
                      <th className="text-left px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider">Title</th>
                      <th className="text-left px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider hidden sm:table-cell">Category</th>
                      <th className="text-left px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider hidden md:table-cell">Year</th>
                      <th className="text-center px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider">Featured</th>
                      <th className="text-center px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider">Published</th>
                      <th className="text-right px-4 py-3 font-semibold text-white/40 text-xs uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project, i) => (
                      <tr
                        key={project.id}
                        className={`border-b border-white/6 last:border-0 hover:bg-white/2 transition-colors ${
                          !project.published ? "opacity-50" : ""
                        }`}
                      >
                        {/* Order controls */}
                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-0.5">
                            <button
                              onClick={() => handleMove(i, -1)}
                              disabled={i === 0}
                              className="p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
                              aria-label="Move up"
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              onClick={() => handleMove(i, 1)}
                              disabled={i === projects.length - 1}
                              className="p-0.5 text-white/30 hover:text-white disabled:opacity-20 transition-colors"
                              aria-label="Move down"
                            >
                              <ChevronDown size={14} />
                            </button>
                          </div>
                        </td>

                        {/* Title */}
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-white leading-snug">{project.title}</p>
                            <p className="text-xs text-white/35 font-mono mt-0.5">{project.slug}</p>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-4 py-3 text-white/60 hidden sm:table-cell">
                          {project.category}
                        </td>

                        {/* Year */}
                        <td className="px-4 py-3 text-white/60 hidden md:table-cell">
                          {project.year}
                        </td>

                        {/* Featured toggle */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleToggle(project, "featured")}
                            className={`inline-flex items-center justify-center p-1.5 rounded-lg transition-colors ${
                              project.featured
                                ? "text-accent bg-accent/10 hover:bg-accent/20"
                                : "text-white/25 hover:text-white/60"
                            }`}
                            aria-label={project.featured ? "Remove featured" : "Mark featured"}
                          >
                            {project.featured ? <Star size={15} fill="currentColor" /> : <StarOff size={15} />}
                          </button>
                        </td>

                        {/* Published toggle */}
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => handleToggle(project, "published")}
                            className={`inline-flex items-center justify-center p-1.5 rounded-lg transition-colors ${
                              project.published
                                ? "text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20"
                                : "text-white/25 hover:text-white/60"
                            }`}
                            aria-label={project.published ? "Unpublish" : "Publish"}
                          >
                            {project.published ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/work/${project.slug}`}
                              target="_blank"
                              className="p-1.5 text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
                              aria-label="Preview"
                            >
                              <ExternalLink size={14} />
                            </Link>
                            <button
                              onClick={() => { setEditing(project); setTab("form"); }}
                              className="p-1.5 text-white/30 hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                              aria-label="Edit"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => handleDuplicate(project.id)}
                              className="p-1.5 text-white/30 hover:text-white/70 transition-colors rounded-lg hover:bg-white/5"
                              aria-label="Duplicate"
                            >
                              <Copy size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(project.id, project.title)}
                              className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-red-400/10"
                              aria-label="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab: Form */}
        {tab === "form" && (
          <ProjectForm
            key={editing?.id ?? "new"}
            initial={editing ?? undefined}
            onSave={editing ? handleUpdate : handleCreate}
            onCancel={() => { setTab("list"); setEditing(null); }}
          />
        )}

        {/* Tab: JSON editor */}
        {tab === "json" && (
          <JsonEditor projects={projects} onSave={handleJsonSave} />
        )}
      </div>
    </div>
  );
}
