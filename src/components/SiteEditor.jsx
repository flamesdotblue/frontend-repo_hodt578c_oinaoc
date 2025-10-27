import React, { useMemo, useState } from 'react';
import { Plus, Save, Trash2, Palette, FileDown } from 'lucide-react';

function SectionPreview({ section, accent }) {
  if (section.type === 'hero') {
    return (
      <section className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold" style={{ color: accent }}>{section.title}</h2>
        <p className="mt-2 text-slate-600">{section.subtitle}</p>
        <button className="mt-4 inline-flex items-center rounded-md px-4 py-2 text-sm text-white" style={{ backgroundColor: accent }}>
          {section.cta}
        </button>
      </section>
    );
  }
  if (section.type === 'features') {
    return (
      <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-4 sm:grid-cols-3">
          {section.items.map((f, i) => (
            <div key={i} className="rounded-lg border border-slate-200 p-4">
              <h3 className="font-semibold" style={{ color: accent }}>{f.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (section.type === 'cta') {
    return (
      <section className="rounded-xl bg-slate-900 p-8 text-center text-white shadow-sm">
        <h3 className="text-xl font-semibold">{section.title}</h3>
        <p className="mt-2 text-slate-300">{section.subtitle}</p>
        <button className="mt-4 inline-flex items-center rounded-md px-4 py-2 text-sm" style={{ backgroundColor: accent }}>
          {section.cta}
        </button>
      </section>
    );
  }
  if (section.type === 'footer') {
    return (
      <footer className="rounded-xl bg-white p-4 text-center text-sm text-slate-600 ring-1 ring-slate-200">
        {section.text}
      </footer>
    );
  }
  return null;
}

export default function SiteEditor({ site, onUpdate, onSaveHTML }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = site.sections[selectedIdx] || null;

  const updateSection = (patch) => {
    const next = site.sections.map((s, i) => (i === selectedIdx ? { ...s, ...patch } : s));
    onUpdate({ ...site, sections: next });
  };

  const addSection = (type) => {
    const defaults = {
      hero: { type: 'hero', title: 'New Hero', subtitle: 'Catchy subtitle here', cta: 'Action' },
      features: { type: 'features', items: [
        { title: 'Feature A', text: 'Short description.' },
        { title: 'Feature B', text: 'Short description.' },
        { title: 'Feature C', text: 'Short description.' },
      ] },
      cta: { type: 'cta', title: 'Call to action', subtitle: 'One last nudge', cta: 'Get started' },
      footer: { type: 'footer', text: '© Your company' },
    };
    const next = [...site.sections, defaults[type]];
    onUpdate({ ...site, sections: next });
    setSelectedIdx(next.length - 1);
  };

  const removeSection = (index) => {
    const next = site.sections.filter((_, i) => i !== index);
    onUpdate({ ...site, sections: next });
    setSelectedIdx((i) => Math.max(0, Math.min(i, next.length - 1)));
  };

  const exportHTML = () => {
    const html = generateHTML(site);
    onSaveHTML(html);
  };

  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Sections</h3>
          <button
            onClick={() => addSection('hero')}
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-xs text-slate-700 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
        <ul className="space-y-2">
          {site.sections.map((s, i) => (
            <li key={i} className={`group flex items-center justify-between rounded-lg border p-2 text-sm ${
              i === selectedIdx ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'
            }`}>
              <button className="flex-1 text-left" onClick={() => setSelectedIdx(i)}>
                <span className="capitalize">{s.type}</span>
              </button>
              <button
                onClick={() => removeSection(i)}
                className="opacity-0 transition group-hover:opacity-100"
                aria-label="Remove section"
              >
                <Trash2 className="h-4 w-4 text-rose-600" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {['features', 'cta', 'footer'].map((t) => (
            <button
              key={t}
              onClick={() => addSection(t)}
              className="rounded-lg border border-slate-200 px-2 py-1 text-xs capitalize text-slate-700 hover:bg-slate-50"
            >
              + {t}
            </button>
          ))}
        </div>
      </aside>

      <main className="min-h-[60vh] rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
        <div className="mx-auto max-w-3xl space-y-6">
          {site.sections.map((s, i) => (
            <SectionPreview key={i} section={s} accent={site.theme.accent} />
          ))}
        </div>
      </main>

      <aside className="h-fit space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-slate-500" />
          <h3 className="font-semibold text-slate-900">Theme</h3>
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-slate-600">Accent color</label>
          <input
            type="color"
            value={site.theme.accent}
            onChange={(e) => onUpdate({ ...site, theme: { ...site.theme, accent: e.target.value } })}
            className="h-10 w-full cursor-pointer rounded-md border border-slate-200"
          />
          <label className="block text-sm text-slate-600">Site name</label>
          <input
            type="text"
            value={site.name}
            onChange={(e) => onUpdate({ ...site, name: e.target.value })}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
            placeholder="My awesome site"
          />
        </div>

        {selected && selected.type === 'hero' && (
          <div className="space-y-2 pt-4">
            <h4 className="text-sm font-semibold text-slate-900">Hero settings</h4>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.title}
              onChange={(e) => updateSection({ title: e.target.value })}
              placeholder="Headline"
            />
            <textarea
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.subtitle}
              onChange={(e) => updateSection({ subtitle: e.target.value })}
              placeholder="Subtitle"
              rows={3}
            />
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.cta}
              onChange={(e) => updateSection({ cta: e.target.value })}
              placeholder="Button label"
            />
          </div>
        )}

        {selected && selected.type === 'features' && (
          <div className="space-y-3 pt-4">
            <h4 className="text-sm font-semibold text-slate-900">Features</h4>
            {selected.items.map((f, idx) => (
              <div key={idx} className="rounded-lg border border-slate-200 p-2">
                <input
                  type="text"
                  className="mb-1 w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  value={f.title}
                  onChange={(e) => {
                    const items = selected.items.map((it, i) => (i === idx ? { ...it, title: e.target.value } : it));
                    updateSection({ items });
                  }}
                  placeholder="Title"
                />
                <input
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm"
                  value={f.text}
                  onChange={(e) => {
                    const items = selected.items.map((it, i) => (i === idx ? { ...it, text: e.target.value } : it));
                    updateSection({ items });
                  }}
                  placeholder="Description"
                />
              </div>
            ))}
            <button
              onClick={() => updateSection({ items: [...selected.items, { title: 'New feature', text: 'Description' }] })}
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" /> Add feature
            </button>
          </div>
        )}

        {selected && selected.type === 'cta' && (
          <div className="space-y-2 pt-4">
            <h4 className="text-sm font-semibold text-slate-900">CTA settings</h4>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.title}
              onChange={(e) => updateSection({ title: e.target.value })}
              placeholder="Title"
            />
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.subtitle}
              onChange={(e) => updateSection({ subtitle: e.target.value })}
              placeholder="Subtitle"
            />
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.cta}
              onChange={(e) => updateSection({ cta: e.target.value })}
              placeholder="Button label"
            />
          </div>
        )}

        {selected && selected.type === 'footer' && (
          <div className="space-y-2 pt-4">
            <h4 className="text-sm font-semibold text-slate-900">Footer text</h4>
            <input
              type="text"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
              value={selected.text}
              onChange={(e) => updateSection({ text: e.target.value })}
              placeholder="Footer text"
            />
          </div>
        )}

        <div className="pt-6">
          <button
            onClick={exportHTML}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            <FileDown className="h-4 w-4" /> Export HTML
          </button>
        </div>
      </aside>
    </section>
  );
}

function generateHTML(site) {
  const escape = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const parts = [];
  parts.push(`<!doctype html>`);
  parts.push(`<html lang="en">`);
  parts.push(`<head>`);
  parts.push(`<meta charset="utf-8"/>`);
  parts.push(`<meta name="viewport" content="width=device-width, initial-scale=1"/>`);
  parts.push(`<title>${escape(site.name)}</title>`);
  parts.push(`<style>`);
  parts.push(`:root{--accent:${site.theme.accent}}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;background:#f8fafc;margin:0;padding:24px;color:#0f172a} .card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,0.04);padding:24px;margin:16px 0} .btn{background:var(--accent);color:#fff;border:none;border-radius:8px;padding:8px 12px;font-size:14px}`);
  parts.push(`</style>`);
  parts.push(`</head>`);
  parts.push(`<body>`);
  parts.push(`<h1 style="margin:0 0 16px 0">${escape(site.name)}</h1>`);
  site.sections.forEach((s) => {
    if (s.type === 'hero') {
      parts.push(`<section class="card"><h2 style="color:var(--accent);margin:0 0 8px 0">${escape(s.title)}</h2><p style="margin:0 0 12px 0;color:#475569">${escape(s.subtitle)}</p><button class="btn">${escape(s.cta)}</button></section>`);
    } else if (s.type === 'features') {
      parts.push(`<section class="card"><div style="display:grid;gap:12px;grid-template-columns:repeat(3,minmax(0,1fr))">${s.items
        .map((f) => `<div style="border:1px solid #e2e8f0;border-radius:8px;padding:12px"><div style="color:var(--accent);font-weight:600">${escape(f.title)}</div><div style="color:#475569;font-size:14px">${escape(f.text)}</div></div>`)
        .join('')}</div></section>`);
    } else if (s.type === 'cta') {
      parts.push(`<section class="card" style="background:#0f172a;color:#fff;text-align:center"><h3>${escape(s.title)}</h3><p style="color:#cbd5e1">${escape(s.subtitle)}</p><button class="btn" style="margin-top:8px">${escape(s.cta)}</button></section>`);
    } else if (s.type === 'footer') {
      parts.push(`<footer class="card" style="text-align:center;color:#475569;font-size:14px">${escape(s.text)}</footer>`);
    }
  });
  parts.push(`</body>`);
  parts.push(`</html>`);
  return parts.join('');
}
