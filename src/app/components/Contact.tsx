import { MapPin, Phone, Clock, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    course: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Prefer a configured Vite env var in development/production.
      // Fallback to same-origin `/api` so nginx can proxy to the backend in production.
      const viteApi = (import.meta as any).env?.VITE_API_URL;
      const apiBase = viteApi || '';

      const response = await fetch(`${apiBase}/api/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: `Phone: ${formData.phone}\nCourse: ${formData.course}\n\n${formData.message}`,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      setSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        course: '',
        message: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const infoItems = [
    { icon: MapPin, title: 'Address', lines: ['756 West Sewrapara, Mirpur, Dhaka'] },
    { icon: Phone, title: 'Phone', lines: ['01835350647'], href: 'tel:01835350647' },
    { icon: Clock, title: 'Office Hours', lines: ['Saturday to Thursday', '9 AM to 6 PM'] },
    { icon: Mail, title: 'Email', lines: ['info@sombhabona.com'], href: 'mailto:info@sombhabona.com' },
  ];

  return (
    <section className="section-pad relative bg-mint" id="contact">
      <div className="section-shell relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Visit Our Hub Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-eyebrow mb-5 bg-white">Get in touch</span>
            <h2 className="section-title">
              Ready to <span className="highlight">start</span>?
            </h2>
            <p className="mt-4 max-w-md text-lg leading-8 text-ink/70">
              Visit our hub, call the helpline, or share your details and our admission team will reach out.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {infoItems.map((item) => {
                const body = (
                  <>
                    <div className="icon-tile bg-shonar text-white">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ink/50">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className={`mt-0.5 font-semibold ${item.href ? 'text-shonar' : 'text-ink'}`}>{line}</p>
                      ))}
                    </div>
                  </>
                );
                const cls = 'flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink/8 transition-all hover:ring-shonar/40';
                return item.href ? (
                  <a key={item.title} href={item.href} className={`${cls} hover:-translate-y-0.5`}>{body}</a>
                ) : (
                  <div key={item.title} className={cls}>{body}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="surface-card relative overflow-hidden p-6 md:p-9">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,var(--brand-green)_0_70%,var(--brand-lime)_70%_88%,var(--brand-yellow)_88%)]" />
              <h3 className="text-2xl font-semibold text-ink">Admission form</h3>
              <p className="mt-1 text-sm text-ink/60">Share your information and we will call you back.</p>

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-ink/80">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    className="form-field"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink/80">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="form-field"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink/80">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="01XXXXXXXXX"
                    autoComplete="tel"
                    required
                    className="form-field"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="course" className="mb-2 block text-sm font-semibold text-ink/80">
                    Interested Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="form-field"
                  >
                    <option value="">Select a path</option>
                    <optgroup label="IT Foundation">
                      <option value="graphic-design">Graphic Design & Freelancing</option>
                      <option value="digital-marketing">Digital Marketing & Freelancing</option>
                      <option value="ai-office">AI Integrated Office Course</option>
                      <option value="basic-computer">Basic Computer Operation with IT Support</option>
                    </optgroup>
                    <optgroup label="Advanced & Certification">
                      <option value="linux">Beginner Linux</option>
                      <option value="rhcsa-rhce">RHCSA & RHCE Exam Preparation</option>
                      <option value="devops-docker">DevOps & Docker</option>
                      <option value="aws-cloud">AWS Cloud for Beginner</option>
                    </optgroup>
                    <optgroup label="Spoken English">
                      <option value="spoken-english-beginner">Spoken English - Beginner</option>
                      <option value="spoken-english-intermediate">Spoken English - Intermediate</option>
                      <option value="spoken-english-advanced">Spoken English - Advanced</option>
                      <option value="spoken-english-full">Spoken English - Full Programme</option>
                    </optgroup>
                    <optgroup label="NSDA Asset Program">
                      <option value="digital-marketing-level3">Digital Marketing - Level 3 (NSDA)</option>
                      <option value="graphic-design-level3">Graphics Design - Level 3 (NSDA)</option>
                      <option value="it-support-level3">IT Support - Level 3 (NSDA)</option>
                    </optgroup>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink/80">
                    Message <span className="font-normal text-ink/45">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your interest"
                    rows={4}
                    className="form-field resize-none"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileTap={{ scale: 0.98 }}
                className="brand-button-primary mt-7 w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                <Send size={19} />
                {loading ? 'Submitting...' : 'Submit Admission Request'}
              </motion.button>

              {error && (
                <motion.div
                  role="alert"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-mint p-4 text-sm font-semibold text-shonar ring-1 ring-shonar/20"
                >
                  <CheckCircle2 size={18} />
                  Thank you for your interest! We will contact you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
