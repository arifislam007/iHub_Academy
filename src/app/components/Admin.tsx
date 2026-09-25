import { useEffect, useState } from 'react';

type ContactRow = {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

const apiBase: string = (import.meta as { env?: { VITE_API_URL?: string } }).env?.VITE_API_URL || '';

async function readError(res: Response) {
  const data = await res.json().catch(() => ({} as { error?: string }));
  if (res.status === 401) return 'Invalid admin key.';
  if (res.status === 429) return data.error || 'Too many attempts. Please wait and try again.';
  return data.error || `Request failed (${res.status})`;
}

export function Admin() {
  // The key lives only in memory: it is never written to browser storage,
  // so it is gone when the tab closes and cannot be read later by injected scripts.
  const [key, setKey] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [contacts, setContacts] = useState<ContactRow[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clean up a key saved to sessionStorage by earlier versions of this page
  useEffect(() => {
    try {
      window.sessionStorage.removeItem('adminKey');
    } catch {
      // storage unavailable
    }
  }, []);

  const fetchContacts = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!key) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${apiBase}/api/contacts`, {
        headers: { 'x-admin-key': key },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        throw new Error(await readError(res));
      }
      setContacts(await res.json());
      setIsAuthorized(true);
    } catch (err) {
      setContacts([]);
      setIsAuthorized(false);
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  const downloadCsv = async () => {
    setError('');
    try {
      const res = await fetch(`${apiBase}/api/contacts/export`, {
        headers: { 'x-admin-key': key },
        signal: AbortSignal.timeout(30000),
      });
      if (!res.ok) {
        throw new Error(await readError(res));
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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download CSV');
    }
  };

  const signOut = () => {
    setKey('');
    setContacts([]);
    setIsAuthorized(false);
    setError('');
  };

  return (
    <section className="min-h-screen bg-cream px-4 py-8">
      <div className="section-shell">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-shonar">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Saved Contacts</h1>
          </div>
          <a href="#home" className="brand-button-secondary">
            Back to site
          </a>
        </div>

        <div className="surface-card p-6">
          {!isAuthorized && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Enter the admin key to unlock saved contacts. The key is kept only while this page is open.
            </div>
          )}

          <form onSubmit={fetchContacts} className="mb-4 flex flex-col gap-3 md:flex-row">
            <label htmlFor="admin-key" className="sr-only">Admin key</label>
            <input
              id="admin-key"
              type="password"
              placeholder="Enter admin key"
              autoComplete="current-password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              className="form-field md:flex-1"
            />
            <button type="submit" className="brand-button-green px-6" disabled={loading || !key}>
              {loading ? 'Loading...' : isAuthorized ? 'Refresh' : 'Load'}
            </button>
            <button
              type="button"
              className="brand-button-secondary px-6 disabled:opacity-50"
              onClick={downloadCsv}
              disabled={!isAuthorized || !contacts.length}
            >
              Download CSV
            </button>
            {isAuthorized && (
              <button type="button" className="brand-button-secondary px-6" onClick={signOut}>
                Sign out
              </button>
            )}
          </form>

          {error && (
            <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isAuthorized && (
            <p className="mb-3 text-sm text-ink/70">
              Showing the {contacts.length} most recent submission{contacts.length === 1 ? '' : 's'} (up to 100). Use CSV for the full list.
            </p>
          )}

          <div className="max-h-[70vh] overflow-auto rounded-xl border border-ink/10">
            <table className="w-full min-w-[720px] table-fixed text-sm">
              <thead className="sticky top-0 bg-mint text-ink">
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
                  <tr key={c.id} className="odd:bg-white even:bg-cream">
                    <td className="p-2 align-top">{c.id}</td>
                    <td className="p-2 align-top break-words">{c.name}</td>
                    <td className="p-2 align-top break-words">{c.email}</td>
                    <td className="p-2 align-top whitespace-pre-wrap break-words">{c.message}</td>
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
