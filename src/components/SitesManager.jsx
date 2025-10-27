import React from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';

export default function SitesManager({ sites, onEdit, onDelete, onCreate }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">My Sites</h2>
          <p className="mt-1 text-slate-600">Create, edit, and manage all your websites in one place.</p>
        </div>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow hover:bg-indigo-500"
        >
          <Plus className="h-4 w-4" /> New site
        </button>
      </div>

      {sites.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-600">You don’t have any sites yet. Click “New site” to start building.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <div key={site.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="h-32 w-full bg-gradient-to-br from-slate-50 to-slate-100" />
              <div className="flex items-start justify-between p-4">
                <div>
                  <h3 className="font-semibold text-slate-900">{site.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{site.pages.length} page(s) • {site.sections.length} section(s)</p>
                </div>
                <div className="mt-1 h-6 w-6 rounded-full" style={{ backgroundColor: site.theme.accent }} />
              </div>
              <div className="flex items-center justify-end gap-2 border-t border-slate-100 p-4">
                <button
                  onClick={() => onEdit(site)}
                  className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Edit className="h-4 w-4" /> Edit
                </button>
                <button
                  onClick={() => onDelete(site.id)}
                  className="inline-flex items-center gap-2 rounded-md bg-rose-600 px-3 py-1.5 text-sm text-white hover:bg-rose-500"
                >
                  <Trash2 className="h-4 w-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
