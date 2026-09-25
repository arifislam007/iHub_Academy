import { BookOpen, Mic, Video, MessageCircle, UserCheck, Star, Hammer, CalendarDays, Clock, ArrowRight, GraduationCap, Briefcase, Laptop, School, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export function SpokenEnglishCourse() {
  const features = [
    { icon: Hammer, text: 'Learning by Doing' },
    { icon: BookOpen, text: 'Grammar & Vocabulary' },
    { icon: Mic, text: 'Public Speaking' },
    { icon: Video, text: 'Multimedia Classroom' },
    { icon: MessageCircle, text: 'Language Club' },
    { icon: UserCheck, text: 'Personal Mentoring' },
  ];

  const courses = [
    {
      step: '01',
      level: 'Beginner',
      duration: '3 Months',
      schedule: 'Fri & Sat · 2 hrs/class',
      popular: false,
    },
    {
      step: '02',
      level: 'Intermediate',
      duration: '3 Months',
      schedule: 'Fri & Sat · 2 hrs/class',
      popular: false,
    },
    {
      step: '03',
      level: 'Advanced',
      duration: '3 Months',
      schedule: 'Fri & Sat · 2 hrs/class',
      popular: false,
    },
    {
      step: '04',
      level: 'Full Programme',
      duration: '9 Months',
      schedule: 'Fri & Sat · 2 hrs/class',
      popular: true,
    },
  ];

  const audiences = [
    { icon: School, label: 'School & College Students' },
    { icon: GraduationCap, label: 'University Students' },
    { icon: Briefcase, label: 'Job Seekers' },
    { icon: Laptop, label: 'Freelancers' },
    { icon: Building2, label: 'Professionals' },
  ];

  return (
    <section className="section-pad relative bg-cream" id="courses">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end"
        >
          <div>
            <span className="section-eyebrow mb-5">Featured course</span>
            <h2 className="section-title">
              Spoken English <span className="text-shonar">Course</span>
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-ink/70 md:text-xl">
              Better English, better future. A practical, interactive course for real-life success.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-md lg:justify-end">
            {features.map((feature) => (
              <span key={feature.text} className="pill bg-white px-3.5 py-2 text-sm text-ink/80 ring-1 ring-ink/8">
                <feature.icon size={15} className="text-shonar" />
                {feature.text}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <motion.div
              key={course.level}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`group relative flex flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                course.popular
                  ? 'bg-shonar text-white shadow-[0_30px_60px_-30px_rgba(11,110,79,0.9)]'
                  : 'bg-white text-ink shadow-[0_16px_40px_-28px_rgba(14,42,34,0.45)] ring-1 ring-ink/8 hover:ring-shonar/40'
              }`}
            >
              {course.popular && (
                <span className="pill absolute -top-3 right-6 bg-sunrise text-ink shadow-md">
                  <Star size={12} fill="currentColor" />
                  Most Popular
                </span>
              )}

              <div className="flex items-baseline justify-between">
                <span className={`font-[family-name:var(--font-display)] text-5xl font-semibold ${course.popular ? 'text-sprout' : 'text-shonar/25'}`}>
                  {course.step}
                </span>
                <span className={`pill ${course.popular ? 'bg-white/15 text-white' : 'bg-mint text-shonar'}`}>
                  {course.duration}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-semibold">{course.level}</h3>

              <ul className={`mt-5 space-y-3 text-sm ${course.popular ? 'text-white/80' : 'text-ink/70'}`}>
                <li className="flex items-center gap-2.5">
                  <CalendarDays size={16} className={course.popular ? 'text-sprout' : 'text-shonar'} />
                  {course.schedule}
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock size={16} className={course.popular ? 'text-sprout' : 'text-shonar'} />
                  Duration: {course.duration}
                </li>
              </ul>

              <div className={`mt-6 border-t pt-5 ${course.popular ? 'border-white/15' : 'border-ink/10'}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${course.popular ? 'text-white/60' : 'text-ink/50'}`}>Fees</p>
                <p className="mt-1.5 text-sm">
                  Admission <span className="font-bold">2,000 TK</span>
                </p>
                <p className="text-sm">
                  Monthly <span className={`text-xl font-extrabold ${course.popular ? 'text-sunrise' : 'text-shonar'}`}>1,500 TK</span>
                </p>
              </div>

              <a
                href="#contact"
                className={`mt-6 ${course.popular ? 'brand-button-primary' : 'brand-button-secondary'} w-full`}
              >
                Enroll Now
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-10 flex flex-col gap-6 rounded-3xl bg-white p-7 ring-1 ring-ink/8 md:p-9 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="max-w-sm">
            <h3 className="text-2xl font-semibold text-ink md:text-3xl">Who can join?</h3>
            <p className="mt-2 text-ink/65">
              Anyone who wants to improve English communication for career growth.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {audiences.map((a) => (
              <span key={a.label} className="pill bg-cream px-4 py-2.5 text-sm text-ink ring-1 ring-ink/10">
                <a.icon size={16} className="text-shonar" />
                {a.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
