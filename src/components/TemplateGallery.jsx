import React from 'react';
import { Rocket, Star, Image as ImageIcon } from 'lucide-react';

const templates = [
  {
    id: 'startup',
    name: 'Startup Launch',
    accent: '#4f46e5',
    primary: '#111827',
    description: 'Bold hero, features, and a strong call to action.',
    preview: (
      <div className="h-full w-full bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="h-1/2 bg-indigo-600/90" />
        <div className="h-1/2 grid grid-cols-3 gap-2 p-3">
          <div className="rounded bg-white shadow" />
          <div className="rounded bg-white shadow" />
          <div className="rounded bg-white shadow" />
        </div>
      </div>
    ),
    sections: [
      { type: 'hero', title: 'Launch faster with SparkSites', subtitle: 'A beautiful starter for your next idea.', cta: 'Get Started' },
      { type: 'features', items: [
        { title: 'No-code editor', text: 'Design with clicks, not code.' },
        { title: 'Responsive', text: 'Looks great on every device.' },
        { title: 'Fast hosting', text: 'Optimized for speed out of the box.' },
      ] },
      { type: 'cta', title: 'Ready to go live?', subtitle: 'Publish in seconds with one click.', cta: 'Publish Now' },
      { type: 'footer', text: '© 2025 SparkSites. All rights reserved.' },
    ],
  },
  {
    id: 'portfolio',
    name: 'Personal Portfolio',
    accent: '#0ea5e9',
    primary: '#0f172a',
    description: 'Showcase projects with a clean case study layout.',
    preview: (
      <div className="h-full w-full bg-gradient-to-br from-sky-50 via-white to-cyan-50">
        <div className="h-1/3 bg-sky-500/90" />
        <div className="h-2/3 grid grid-cols-2 gap-2 p-3">
          <div className="rounded bg-white shadow" />
          <div className="rounded bg-white shadow" />
        </div>
      </div>
    ),
    sections: [
      { type: 'hero', title: 'Hi, I’m Alex', subtitle: 'Designer and developer crafting delightful experiences.', cta: 'View Work' },
      { type: 'features', items: [
        { title: 'UI/UX', text: 'Human-centered design that works.' },
        { title: 'Frontend', text: 'Accessible, performant, maintainable.' },
        { title: 'Brand', text: 'Identity systems that scale.' },
      ] },
      { type: 'cta', title: 'Let’s collaborate', subtitle: 'Open for freelance projects and full-time roles.', cta: 'Contact Me' },
      { type: 'footer', text: '© 2025 Alex Doe' },
    ],
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    accent: '#22c55e',
    primary: '#111827',
    description: 'Menu highlights with mouth-watering imagery.',
    preview: (
      <div className="h-full w-full bg-gradient-to-br from-emerald-50 via-white to-lime-50">
        <div className="h-2/5 bg-emerald-500/90" />
        <div className="h-3/5 grid grid-cols-3 gap-2 p-3">
          <div className="rounded bg-white shadow" />
          <div className="rounded bg-white shadow" />
          <div className="rounded bg-white shadow" />
        </div>
      </div>
    ),
    sections: [
      { type: 'hero', title: 'Farm to Table', subtitle: 'Seasonal menu crafted daily.', cta: 'Book a Table' },
      { type: 'features', items: [
        { title: 'Fresh Ingredients', text: 'Locally sourced produce.' },
        { title: 'Chef’s Specials', text: 'New dishes every week.' },
        { title: 'Cozy Atmosphere', text: 'Make yourself at home.' },
      ] },
      { type: 'cta', title: 'Reserve now', subtitle: 'We fill up fast on weekends.', cta: 'Reserve' },
      { type: 'footer', text: '© 2025 Farm to Table' },
    ],
  },
];

export default function TemplateGallery({ onChoose }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Pick a template to start</h1>
          <p className="mt-1 text-slate-600">You can customize everything later in the editor.</p>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Rocket className="h-5 w-5 text-indigo-600" />
          <span className="text-sm text-slate-500">Lightning-fast publishing</span>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t) => (
          <div key={t.id} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
            <div className="h-40 w-full">{t.preview}</div>
            <div className="flex items-start justify-between p-4">
              <div>
                <h3 className="font-semibold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{t.description}</p>
              </div>
              <div className="mt-1 h-6 w-6 rounded-full" style={{ backgroundColor: t.accent }} />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 p-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <button
                onClick={() => onChoose(t)}
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
              >
                <ImageIcon className="h-4 w-4" /> Use template
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
