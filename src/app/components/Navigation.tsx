import { Menu, X, GraduationCap, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

const links = [
  { href: '#it-courses', label: 'IT Courses' },
  { href: '#courses', label: 'Spoken English' },
  { href: '#admission', label: 'NSDA Program' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#contact', label: 'Contact' },
];

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
      isScrolled || isMenuOpen ? 'border-b border-ink/10 bg-cream/90 shadow-[0_10px_30px_-18px_rgba(14,42,34,0.4)] backdrop-blur-xl' : 'bg-transparent'
    }`}>
      <div className="section-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-shonar text-white">
              <GraduationCap size={22} />
              <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-cream bg-sunrise" />
            </div>
            <div className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
                Sombhabona <span className="text-shonar">iHub</span>
              </span>
              <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink/55">
                Future-ready skills
              </span>
            </div>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:bg-mint hover:text-shonar"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="tel:01835350647" className="flex items-center gap-2 text-sm font-semibold text-ink/70 hover:text-shonar">
              <Phone size={16} />
              01835350647
            </a>
            <a href="#contact" className="brand-button-primary px-5 py-2.5 text-sm">
              Admission Open
            </a>
          </div>

          <button
            className="rounded-xl border border-ink/15 bg-white p-2 text-ink transition-colors hover:bg-mint lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="space-y-1 pb-5 lg:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink/80 hover:bg-mint hover:text-shonar"
              >
                {link.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <a href="tel:01835350647" className="brand-button-secondary py-2.5 text-sm">
                <Phone size={16} />
                Call us
              </a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="brand-button-primary py-2.5 text-sm">
                Admission Open
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
