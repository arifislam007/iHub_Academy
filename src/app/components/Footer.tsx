import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

// Add each profile URL to show its icon in the footer
const socials = [
  { Icon: Facebook, label: 'Facebook', url: '' },
  { Icon: Instagram, label: 'Instagram', url: '' },
  { Icon: Linkedin, label: 'LinkedIn', url: '' },
  { Icon: Twitter, label: 'Twitter', url: '' },
].filter((s) => s.url);

export function Footer() {
  return (
    <footer className="bg-ink px-4 pt-16 pb-8 text-white">
      <div className="section-shell">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1fr]">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-shonar">
                <GraduationCap size={22} />
              </div>
              <h3 className="text-2xl font-semibold text-white">
                Sombhabona <span className="text-sprout">iHub</span>
              </h3>
            </div>
            <p className="mt-4 max-w-xs leading-relaxed text-white/65">
              Building futures through practical skills training and professional development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-sunrise">Quick Links</h4>
            <ul className="space-y-2.5">
              <li><a href="#it-courses" className="text-white/70 transition-colors hover:text-white">IT Courses</a></li>
              <li><a href="#courses" className="text-white/70 transition-colors hover:text-white">Spoken English</a></li>
              <li><a href="#admission" className="text-white/70 transition-colors hover:text-white">NSDA Program</a></li>
              <li><a href="#why-us" className="text-white/70 transition-colors hover:text-white">Why Us</a></li>
              <li><a href="#contact" className="text-white/70 transition-colors hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-sunrise">Contact</h4>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3 text-white/70">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-sprout" />
                <span className="text-sm">Near Metro Pillar 304, Mirpur, Dhaka</span>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Phone size={18} className="flex-shrink-0 text-sprout" />
                <a href="tel:01835350647" className="transition-colors hover:text-white">01835350647</a>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <Mail size={18} className="flex-shrink-0 text-sprout" />
                <a href="mailto:info@sombhabona.com" className="transition-colors hover:text-white">info@sombhabona.com</a>
              </li>
            </ul>
          </div>

          {/* Social Media: only shown once real profile URLs are filled in */}
          {socials.length > 0 && (
            <div>
              <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-sunrise">Follow Us</h4>
              <div className="flex gap-2.5">
                {socials.map(({ Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-xl bg-white/8 p-2.5 text-white/80 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-sunrise hover:text-ink"
                  >
                    <Icon size={19} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50 md:flex-row">
          <p>© 2026 Sombhabona Innovation Hub. All rights reserved.</p>
          <p>Better skills, better future.</p>
        </div>
      </div>
    </footer>
  );
}
