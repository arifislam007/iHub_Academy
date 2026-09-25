import { ShieldCheck, TrendingUp, Palette, Headphones, Check, Download, ArrowRight, Clock, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';

export function AssetProgram() {
  const programs = [
    {
      title: 'Digital Marketing for Freelancing',
      level: 'Level 3',
      description: 'Turn clicks into customers with SEO, paid ads, content strategy, and analytics-driven growth.',
      duration: '3 Months',
      schedule: '4 hrs/day · 6 days/week',
      icon: TrendingUp,
      features: ['SEO Mastery', 'Paid Advertising', 'Content Strategy', 'Analytics'],
    },
    {
      title: 'Graphics Design for Freelancing',
      level: 'Level 3',
      description: 'Master advanced Photoshop/Illustrator, brand identity, and visual storytelling for premium clients.',
      duration: '3 Months',
      schedule: '4 hrs/day · 6 days/week',
      icon: Palette,
      features: ['Photoshop Pro', 'Illustrator', 'Brand Identity', 'Portfolio'],
    },
    {
      title: 'IT Support',
      level: 'Level 3',
      description: 'Build technical support expertise in hardware, networking, cloud basics, security, and OS management.',
      duration: '3 Months',
      schedule: '4 hrs/day · 6 days/week',
      icon: Headphones,
      features: ['Hardware', 'Networking', 'Cloud Basics', 'Security'],
    },
  ];

  return (
    <section className="section-pad relative overflow-hidden bg-shonar text-white" id="admission">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-sprout/15 blur-2xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-ink/25 blur-2xl" />
      </div>

      <div className="section-shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end"
        >
          <div>
            <span className="section-eyebrow-dark mb-5">
              <ShieldCheck size={14} />
              Government certified
            </span>
            <h2 className="section-title text-white">
              Asset Program with <span className="text-sunrise">NSDA</span>
            </h2>
          </div>
          <p className="text-lg leading-8 text-white/75 md:text-xl">
            Professional certification programs in partnership with the National Skills Development Authority.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="group flex flex-col rounded-3xl bg-cream p-7 text-ink shadow-[0_30px_60px_-30px_rgba(14,42,34,0.7)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="flex items-start justify-between">
                <div className="icon-tile h-14 w-14 bg-shonar text-white">
                  <program.icon size={26} />
                </div>
                <span className="pill bg-ink text-sprout">NSDA {program.level}</span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold leading-snug">{program.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/65">{program.description}</p>

              <ul className="mt-6 grid flex-1 grid-cols-2 content-start gap-x-3 gap-y-2.5">
                {program.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm font-medium">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sprout/30 text-shonar">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
                <div className="text-sm font-semibold text-ink/65">
                  <span className="flex items-center gap-1.5">
                    <Clock size={15} className="text-shonar" />
                    {program.duration}
                  </span>
                  <span className="mt-1 flex items-center gap-1.5 text-xs">
                    <CalendarDays size={14} className="text-shonar" />
                    {program.schedule}
                  </span>
                </div>
                <a href="#contact" className="brand-button-green px-5 py-2.5 text-sm">
                  Enroll
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 flex flex-col items-center justify-between gap-5 rounded-3xl bg-ink/30 p-6 ring-1 ring-white/10 md:flex-row md:p-8"
        >
          <p className="text-center text-lg font-semibold md:text-left">
            Seats are limited for each NSDA batch. Reserve yours today.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="brand-button-primary px-7">
              Enroll Now
              <ArrowRight size={18} />
            </a>
            <a
              href="/sombhabona_courses.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-7 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <Download size={18} />
              Download Brochure
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
