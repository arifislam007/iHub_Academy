import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react';
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

  return (
    <section className="section-pad relative overflow-hidden" id="contact">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(23,50,74,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.45),rgba(248,243,234,0.65))]" />
      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-lede">
            Ready to start? Visit us or call our helpline today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visit Our Hub Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl mb-8 text-slate-900">
              Visit Our Hub
            </h3>

            <div className="space-y-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="surface-card-soft flex items-start gap-4 p-6"
              >
                <div className="bg-slate-900 p-3 rounded-xl flex-shrink-0 text-white">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Address</h4>
                  <p className="text-gray-600">756 West Sewrapara, Mirpur, Dhaka</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="surface-card-soft flex items-start gap-4 p-6"
              >
                <div className="bg-emerald-600 p-3 rounded-xl flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Phone</h4>
                  <a href="tel:01835350647" className="text-green-600 hover:underline text-lg">
                    01835350647
                  </a>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="surface-card-soft flex items-start gap-4 p-6"
              >
                <div className="bg-amber-600 p-3 rounded-xl flex-shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Office Hours</h4>
                  <p className="text-gray-600">Saturday to Thursday</p>
                  <p className="text-gray-600">Time: 9 AM to 6 PM</p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="surface-card-soft flex items-start gap-4 p-6"
              >
                <div className="bg-rose-600 p-3 rounded-xl flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-lg">Email</h4>
                  <a href="mailto:info@sombhabona.com" className="text-pink-600 hover:underline text-lg">
                    info@sombhabona.com
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="surface-card p-8">
              <div className="mb-6">
                <div className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  For Admission Share Your Information
                </div>
                <label htmlFor="fullName" className="block mb-3 font-semibold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-3 font-semibold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="phone" className="block mb-3 font-semibold text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-transparent transition-all"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="course" className="block mb-3 font-semibold text-gray-700">
                  Interested Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-transparent transition-all"
                >
                  <option value="">Select a path</option>
                  <option value="spoken-english-beginner">Spoken English - Beginner</option>
                  <option value="spoken-english-intermediate">Spoken English - Intermediate</option>
                  <option value="spoken-english-advanced">Spoken English - Advanced</option>
                  <option value="spoken-english-full">Spoken English - Full Programme</option>
                  <option value="graphic-design">Graphic Design & Freelancing</option>
                  <option value="digital-marketing">Digital Marketing & Freelancing</option>
                  <option value="it-support">IT Support</option>
                  <option value="basic-computer">Basic Computer Operation</option>
                  <option value="linux">Linux Operation for Beginner</option>
                  <option value="rhcsa-rhce">RHCSA & RHCE Exam Preparation</option>
                  <option value="devops-docker">DevOps & Docker</option>
                  <option value="aws-cloud">AWS Cloud for Beginner</option>
                  <option value="digital-marketing-level3">Digital Marketing - Level 3 (NSDA)</option>
                  <option value="graphic-design-level3">Graphics Design - Level 3 (NSDA)</option>
                  <option value="it-support-level3">IT Support - Level 3 (NSDA)</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block mb-3 font-semibold text-gray-700">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your interest"
                  rows={4}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl bg-white/90 focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-transparent transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {loading ? 'Submitting...' : 'Enroll Now'}
              </motion.button>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm"
                >
                  ✓ Thank you for your interest! We will contact you soon.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
