import React from 'react';
import { Rocket, Settings, Home, LayoutTemplate, Globe } from 'lucide-react';

export default function Navbar({ view, setView }) {
  const navItem = (key, label, Icon) => (
    <button
      key={key}
      onClick={() => setView(key)}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        view === key
          ? 'bg-indigo-600 text-white'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
      aria-current={view === key ? 'page' : undefined}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-slate-900">SparkSites</span>
        </div>
        <nav className="hidden gap-2 md:flex">
          {navItem('templates', 'Templates', LayoutTemplate)}
          {navItem('editor', 'Editor', Settings)}
          {navItem('manage', 'My Sites', Home)}
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView('templates')}
            className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white shadow hover:bg-slate-800"
          >
            <Globe className="h-4 w-4" />
            Create Site
          </button>
        </div>
      </div>
    </header>
  );
}
