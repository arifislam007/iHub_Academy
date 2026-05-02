import { Menu, X, GraduationCap, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'border-b border-white/60 bg-[#f8f3ea]/90 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/20">
              <GraduationCap size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                <Sparkles size={12} />
                  Sombhabona iHub
              </div>
              <span className="block text-lg font-bold text-slate-900">
                Future-ready skills
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#courses" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">Courses</a>
            <a href="#why-us" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">Why Us</a>
            <a href="#contact" className="text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">Contact</a>
            <a href="#contact" className="brand-button-primary text-sm">
              Admission Open
            </a>
          </div>

          <button
            className="rounded-xl border border-slate-200 bg-white/80 p-2 text-slate-900 transition-colors hover:bg-white md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="surface-card mt-3 space-y-2 p-3 md:hidden">
            <a href="#courses" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Courses</a>
            <a href="#why-us" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Why Us</a>
            <a href="#contact" className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">Contact</a>
            <a href="#contact" className="block rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Admission Open</a>
          </div>
        )}
      </div>
    </nav>
  );
}
