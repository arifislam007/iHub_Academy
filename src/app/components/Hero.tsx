import { Download, Phone, ArrowRight, CheckCircle2, Users, Clock3, Sprout, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';

export function Hero() {
  const highlights = [
    'Hands-on classroom practice',
    'Career and freelancing support',
    'NSDA certified programs',
  ];

  const stats = [
    { number: '500+', label: 'Learners supported' },
    { number: '20+', label: 'Programs available' },
    { number: '95%', label: 'Practical class focus' },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-mint blur-3xl" />
        <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-sunrise/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(rgba(14,42,34,0.12) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'linear-gradient(180deg, black, transparent 75%)',
          }}
        />
      </div>

      <div className="section-shell relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow mb-6 w-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sprout opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-shonar" />
              </span>
              Admissions open for the next intake
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title max-w-3xl"
            >
              Practical training that grows into a <span className="highlight">career</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-8 text-ink/70 md:text-xl"
            >
              Sombhabona iHub helps students, job seekers, and aspiring freelancers
              build real-world confidence through spoken English, IT, and industry-ready programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            >
              <a href="#contact" className="brand-button-primary px-7 py-3.5">
                Enroll Now
                <ArrowRight size={18} />
              </a>
              <a href="/sombhabona_courses.pdf" target="_blank" rel="noreferrer" className="brand-button-secondary px-7 py-3.5">
                <Download size={18} />
                Download Brochure
              </a>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
            >
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/75">
                  <CheckCircle2 size={18} className="text-shonar" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative"
          >
            {/* Main green card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-shonar p-6 text-white shadow-[0_40px_80px_-40px_rgba(11,110,79,0.9)] md:p-8">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sprout/25" />
              <div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-white/5" />

              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <span className="pill bg-sunrise text-ink">New Batch</span>
                  <Sprout className="text-sprout" size={28} />
                </div>
                <p className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug md:text-3xl">
                  Hands-on learning, not passive lectures.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                    <div className="flex items-center gap-2 text-sm text-white/75">
                      <Users size={16} />
                      Small batch mentoring
                    </div>
                    <p className="mt-2 text-3xl font-extrabold text-sunrise">1:15</p>
                    <p className="mt-1 text-sm text-white/70">Focused teacher support in every class.</p>
                  </div>
                  <div className="rounded-2xl bg-cream p-5 text-ink">
                    <div className="flex items-center gap-2 text-sm text-ink/60">
                      <Clock3 size={16} />
                      Class rhythm
                    </div>
                    <p className="mt-2 text-2xl font-extrabold">Weekend friendly</p>
                    <p className="mt-1 text-sm text-ink/65">For students, job holders & freelancers.</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 divide-x divide-white/15 rounded-2xl bg-ink/30 py-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-2 text-center">
                      <p className="text-2xl font-extrabold">{stat.number}</p>
                      <p className="mt-1 text-[0.68rem] font-semibold uppercase leading-tight tracking-[0.12em] text-white/65">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="surface-card absolute -bottom-6 -left-4 hidden items-center gap-3 px-4 py-3 sm:flex"
            >
              <div className="icon-tile h-10 w-10 bg-sunrise text-ink">
                <BadgeCheck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-ink">NSDA Partner</p>
                <p className="text-xs text-ink/60">Govt. certified programs</p>
              </div>
            </motion.div>

            <a
              href="tel:01835350647"
              className="surface-card absolute -right-3 -top-5 hidden items-center gap-2 px-4 py-2.5 text-sm font-bold text-ink transition-colors hover:text-shonar md:flex"
            >
              <Phone size={16} className="text-shonar" />
              01835350647
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
