import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-8 border-t border-white/70 bg-[#142033] px-4 py-12 text-white">
      <div className="section-shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 mb-8">
          {/* Brand Section */}
          <div>
                <h3 className="text-2xl mb-4 text-white">
                  Sombhabona iHub
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Building futures through practical skills training and professional development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg mb-4 font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#courses" className="text-slate-300 hover:text-white transition-colors">Courses</a></li>
              <li><a href="#why-us" className="text-slate-300 hover:text-white transition-colors">Why Us</a></li>
              <li><a href="#admission" className="text-slate-300 hover:text-white transition-colors">Admission</a></li>
              <li><a href="#contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg mb-4 font-semibold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-slate-300">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <span className="text-sm">Near Metro Pillar 304, Mirpur, Dhaka</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:01835350647" className="hover:text-white transition-colors">01835350647</a>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@sombhabona.com" className="hover:text-white transition-colors">info@sombhabona.com</a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg mb-4 font-semibold">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="rounded-xl bg-white/10 p-3 transition-all hover:scale-110 hover:bg-white/20">
                <Facebook size={20} />
              </a>
              <a href="#" className="rounded-xl bg-white/10 p-3 transition-all hover:scale-110 hover:bg-white/20">
                <Instagram size={20} />
              </a>
              <a href="#" className="rounded-xl bg-white/10 p-3 transition-all hover:scale-110 hover:bg-white/20">
                <Linkedin size={20} />
              </a>
              <a href="#" className="rounded-xl bg-white/10 p-3 transition-all hover:scale-110 hover:bg-white/20">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-slate-300">
            © 2026 Sombhabona Innovation Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
