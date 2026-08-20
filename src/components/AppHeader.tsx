import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useOptionalAuth } from '../auth/AuthProvider';
import { replaceDocument } from '../lib/browserNavigation';
import { Button } from './ui/Button';
import { ThemeToggle } from './ThemeToggle';

const navClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm font-bold transition ${isActive ? 'bg-[#5f2548] text-white' : 'text-[#725c64] hover:bg-[#fff1dc] hover:text-[#3d2932] dark:text-[#d7c5cd] dark:hover:bg-[#2c1a25] dark:hover:text-white'}`;

export function AppHeader() {
  const auth = useOptionalAuth();
  const [logoutError, setLogoutError] = useState('');
  const signOut = async () => {
    if (!auth || auth.status !== 'authenticated') return;
    setLogoutError('');
    try { await auth.logout(); replaceDocument('/'); }
    catch (cause) { setLogoutError(cause instanceof Error ? `Sign out could not be confirmed: ${cause.message}` : 'Sign out could not be confirmed. Please retry.'); }
  };

  return (
    <header className="sticky top-0 z-[1000] border-b border-[#ead8c4] bg-[#fffaf2]/92 backdrop-blur-xl dark:border-[#4d2d43] dark:bg-[#171018]/92">
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 lg:px-8">
        <Link to="/" className="mr-auto flex items-center gap-2.5 font-black tracking-tight text-[#28171f] dark:text-white">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-[#5f2548] text-xs font-black text-white shadow-sm">CS</span>
          <span>CompanyScope <span className="hidden text-[10px] uppercase tracking-[.18em] text-[#b35b2d] lg:inline">Product Studio</span></span>
        </Link>
        <div className="hidden items-center gap-1 md:flex"><NavLink to="/dashboard" className={navClass}>Decisions</NavLink><NavLink to="/companies/northstar-berlin-security/overview" className={navClass}>Sample company</NavLink></div>
        <ThemeToggle />
        <div className="flex min-w-fit items-center gap-2">
          {auth?.status === 'authenticated' ? <><Link to="/dashboard" className="hidden rounded-full border border-[#dcc5ad] bg-white/70 px-3 py-2 text-sm font-bold text-[#3d2932] sm:inline-flex dark:border-[#5b394a] dark:bg-[#21141c] dark:text-white">Workspace</Link><Button variant="secondary" className="min-w-[6.75rem]" onClick={() => void signOut()} disabled={auth.busy}>{auth.busy ? 'Signing out…' : 'Sign out'}</Button></> : auth?.status === 'checking' ? <span className="min-w-[6.75rem] px-3 py-2 text-center text-sm text-[#8a6f77]" aria-live="polite">Checking…</span> : auth?.status === 'error' ? <span className="min-w-[6.75rem] px-3 py-2 text-center text-sm font-semibold text-amber-700 dark:text-amber-300" title="Session status could not be verified">Session unavailable</span> : <Link to="/login" className="inline-flex min-h-11 min-w-[6.75rem] items-center justify-center rounded-full bg-[#5f2548] px-3 py-2 text-sm font-bold text-white">Sign in</Link>}
        </div>
      </nav>
      {logoutError && <div role="alert" className="mx-auto max-w-7xl px-5 pb-3 text-right text-xs font-medium text-amber-700 lg:px-8 dark:text-amber-300">{logoutError}</div>}
    </header>
  );
}
