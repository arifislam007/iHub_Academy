import { Download, Phone, Sparkles, ArrowRight, CheckCircle2, GraduationCap, Users, Clock3 } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const highlights = [
    'Hands-on classroom practice',
    'Career and freelancing support',
  ];

  const stats = [
    { number: '500+', label: 'Learners supported' },
    { number: '20+', label: 'Programs available' },
    { number: '95%', label: 'Practical class focus' },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[38rem] bg-[radial-gradient(circle_at_top,rgba(23,50,74,0.2),transparent_60%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(246,241,233,0.2))]" />
        <motion.div
          className="absolute left-10 top-12 h-72 w-72 rounded-full bg-emerald-300/25 blur-3xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/20 blur-3xl"
          animate={{ scale: [1.05, 0.95, 1.05], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow mb-6 w-fit"
            >
              <Sparkles size={14} className="text-emerald-700" />
              Admissions open for the next intake
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title max-w-4xl"
            >
              Practical training, turns into a career.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="section-lede mt-6 max-w-2xl text-left mx-0"
            >
                Sombhabona iHub helps students, job seekers, and aspiring freelancers
              build real-world confidence through spoken English, IT, and industry-ready programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <a href="#contact" className="brand-button-primary">
                Enroll Now
                <ArrowRight size={18} />
              </a>
              <a href="/sombhabona_courses.pdf" target="_blank" rel="noreferrer" className="brand-button-secondary">
                <Download size={18} />
                Download Brochure
              </a>
              <a href="tel:01835350647" className="brand-button-secondary">
                <Phone size={18} />
                01835350647
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {highlights.map((item) => (
                <span key={item} className="surface-card-soft inline-flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-700">
                  <CheckCircle2 size={16} className="text-emerald-700" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative"
          >
            <div className="surface-card relative overflow-hidden p-6 md:p-8">
              <div className="absolute right-0 top-0 h-36 w-36 rounded-bl-[3rem] bg-gradient-to-br from-emerald-200 to-cyan-200 opacity-80" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                    <GraduationCap size={26} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">New Batch</p>
                    <p className="text-xl font-bold text-slate-900">Hands-on learning, not passive lectures</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-slate-950 p-5 text-white">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Users size={16} />
                      Small batch mentoring
                    </div>
                    <p className="mt-3 text-3xl font-bold">1:15</p>
                    <p className="mt-2 text-sm text-white/70">Focused teacher support in every class.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-white p-5">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Clock3 size={16} />
                      Class rhythm
                    </div>
                    <p className="mt-3 text-3xl font-bold text-slate-900">Weekend friendly</p>
                    <p className="mt-2 text-sm text-slate-600">Designed for students, job holders, and freelancers.</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white/90 p-4 text-center">
                      <p className="text-2xl font-bold text-slate-900">{stat.number}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
