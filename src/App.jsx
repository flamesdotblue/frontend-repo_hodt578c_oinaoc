import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import TemplateGallery from './components/TemplateGallery';
import SiteEditor from './components/SiteEditor';
import SitesManager from './components/SitesManager';

function createSiteFromTemplate(t) {
  return {
    id: Math.random().toString(36).slice(2),
    name: t.name,
    pages: ['Home'],
    sections: t.sections,
    theme: { accent: t.accent, primary: t.primary },
    createdAt: Date.now(),
  };
}

export default function App() {
  const [view, setView] = useState('templates');
  const [sites, setSites] = useState([]);
  const [currentId, setCurrentId] = useState(null);

  const current = useMemo(() => sites.find((s) => s.id === currentId) || null, [sites, currentId]);

  const handleChooseTemplate = (t) => {
    const site = createSiteFromTemplate(t);
    setSites((prev) => [site, ...prev]);
    setCurrentId(site.id);
    setView('editor');
  };

  const updateCurrent = (next) => {
    setSites((prev) => prev.map((s) => (s.id === next.id ? next : s)));
  };

  const deleteSite = (id) => {
    setSites((prev) => prev.filter((s) => s.id !== id));
    if (currentId === id) {
      setCurrentId(null);
      setView('manage');
    }
  };

  const editSite = (site) => {
    setCurrentId(site.id);
    setView('editor');
  };

  const saveHTML = (html) => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(current?.name || 'site').replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar view={view} setView={setView} />

      {view === 'templates' && <TemplateGallery onChoose={handleChooseTemplate} />}

      {view === 'editor' && current && (
        <SiteEditor site={current} onUpdate={updateCurrent} onSaveHTML={saveHTML} />
      )}

      {view === 'manage' && (
        <SitesManager
          sites={sites}
          onEdit={editSite}
          onDelete={deleteSite}
          onCreate={() => setView('templates')}
        />
      )}

      <footer className="border-t border-slate-200 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500">
          Built with love to help you launch faster. Your changes are stored locally in your browser for this demo.
        </div>
      </footer>
    </div>
  );
}
