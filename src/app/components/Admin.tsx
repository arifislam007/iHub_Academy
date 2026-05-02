import React, { useState } from 'react';

export function Admin() {
  const [key, setKey] = useState(() => window.sessionStorage.getItem('adminKey') || '');
  const [isAuthorized, setIsAuthorized] = useState(Boolean(window.sessionStorage.getItem('adminKey')));
  const [contacts, setContacts] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const viteApi = (import.meta as any).env?.VITE_API_URL;
  const apiBase = viteApi || '';

  const fetchContacts = async () => {
    setError('');
    setLoading(true);
    try {
      window.sessionStorage.setItem('adminKey', key);
      setIsAuthorized(true);
      const url = `${apiBase}/api/contacts`;
      console.debug('Admin fetchContacts', { url, keyProvided: Boolean(key) });
      const res = await fetch(url, {
        headers: { 'x-admin-key': key },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Status ${res.status}`);
      }
      const data = await res.json();
      setContacts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = async () => {
    setError('');
    try {
      const res = await fetch(`${apiBase}/api/contacts/export`, {
        headers: { 'x-admin-key': key },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Status ${res.status}`);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts_export.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(err.message || 'Failed to download CSV');
    }
  };

  return (
    <section className="min-h-screen bg-[linear-gradient(180deg,rgba(248,243,234,0.95),rgba(255,255,255,1))] px-4 py-8">
      <div className="section-shell">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Saved Contacts</h1>
          </div>
          <a href="#home" className="brand-button-secondary">
            Back to site
          </a>
        </div>

        <div className="surface-card p-6">
          {!isAuthorized ? (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Enter the admin key to unlock saved contacts. The key is stored only in this browser session.
            </div>
          ) : null}

          <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <input
              type="password"
              placeholder="Enter admin key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="w-full rounded-md border border-slate-200 px-3 py-2"
            />
            <button className="brand-button-primary px-4 py-2" onClick={fetchContacts} disabled={loading || !key}>
              {loading ? 'Loading...' : 'Load'}
            </button>
            <button className="rounded-md border border-slate-200 px-4 py-2" onClick={downloadCsv} disabled={!contacts.length || !key}>
              Download CSV
            </button>
          </div>

          {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

          <div className="max-h-[70vh] overflow-auto rounded-md border border-slate-200">
            <table className="w-full table-fixed text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="w-16 p-2 text-left">ID</th>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Message</th>
                  <th className="w-44 p-2 text-left">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c.id} className="odd:bg-white even:bg-slate-50">
                    <td className="p-2 align-top">{c.id}</td>
                    <td className="p-2 align-top">{c.name}</td>
                    <td className="p-2 align-top">{c.email}</td>
                    <td className="p-2 align-top whitespace-pre-wrap">{c.message}</td>
                    <td className="p-2 align-top">{new Date(c.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Admin;
