import { Monitor, TrendingUp, Sparkles, Laptop, Terminal, Award, Container, Cloud, ArrowRight, Clock, MapPin, Flame, FileText, CalendarDays } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

type Course = {
  title: string;
  description: string;
  duration: string;
  mode?: string;
  schedule?: string;
  icon: typeof Monitor;
  learnMoreHref?: string;
};

export function ITCourses() {
  const foundationCourses: Course[] = [
    {
      title: 'Graphic Design & Freelancing',
      description: 'Master Photoshop and design workflows to start freelancing confidently.',
      duration: '2 Months',
      mode: 'Online/Offline',
      icon: Monitor,
    },
    {
      title: 'Digital Marketing & Freelancing',
      description: 'Learn SEO, ads, and social media strategy for business growth and freelancing.',
      duration: '3 Months',
      mode: 'Online/Offline',
      icon: TrendingUp,
    },
    {
      title: 'AI Integrated Office Course',
      description: 'Work smarter in Word, Excel, and PowerPoint using AI tools for writing, data, and presentations.',
      duration: '20 Days',
      schedule: '1.5 hrs/class · 3 days/week',
      icon: Sparkles,
    },
    {
      title: 'Basic Computer Operation with IT Support',
      description: 'Build confidence with core computer, internet, and office tasks plus hands-on troubleshooting and system support.',
      duration: '25 Days',
      schedule: '1.5 hrs/class · 6 days/week',
      mode: 'Online/Offline',
      icon: Laptop,
    },
  ];

  const advancedCourses: Course[] = [
    {
      title: 'Beginner Linux',
      description: 'Learn Linux fundamentals, shell commands, and server basics through labs.',
      duration: '3 Months',
      mode: 'Online/Offline',
      icon: Terminal,
      learnMoreHref: '/linux_info.html',
    },
    {
      title: 'RHCSA & RHCE Exam Preparation',
      description: 'Structured Red Hat certification prep with guided practice and mock tests.',
      duration: '3 Months',
      mode: 'Offline',
      icon: Award,
      learnMoreHref: '/linux_info.html',
    },
    {
      title: 'DevOps & Docker',
      description: 'Ship faster with CI/CD basics, containers, and practical DevOps workflows.',
      duration: '3 Months',
      mode: 'Online/Offline',
      icon: Container,
    },
    {
      title: 'AWS Cloud for Beginner',
      description: 'Get hands-on with EC2, networking, security, and cloud deployment basics.',
      duration: '2 Months',
      mode: 'Online/Offline',
      icon: Cloud,
    },
  ];

  const tabs = [
    { id: 'foundation', label: 'Foundation', courses: foundationCourses },
    { id: 'advanced', label: 'Advanced & Certification', courses: advancedCourses },
  ] as const;

  const [active, setActive] = useState<(typeof tabs)[number]['id']>('foundation');
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="section-pad relative bg-mint" id="it-courses">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="pill mb-5 bg-sunrise px-4 py-1.5 text-ink">
            <Flame size={14} />
            50% off on selected programs
          </span>
          <h2 className="section-title">
            IT & Professional <span className="highlight">Courses</span>
          </h2>
          <p className="section-lede mt-4">
            Practical, hands-on training designed for the modern digital workplace.
          </p>
        </motion.div>

        <div className="mb-10 flex justify-center">
          <div role="tablist" className="inline-flex rounded-full bg-white p-1.5 ring-1 ring-ink/8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === tab.id}
                onClick={() => setActive(tab.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:px-7 ${
                  active === tab.id ? 'text-white' : 'text-ink/65 hover:text-shonar'
                }`}
              >
                {active === tab.id && (
                  <motion.span
                    layoutId="it-tab"
                    className="absolute inset-0 rounded-full bg-shonar"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4"
          >
            {current.courses.map((course) => (
              <div
                key={course.title}
                className="surface-card group flex flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-shonar/40"
              >
                <div className="icon-tile group-hover:bg-shonar group-hover:text-white">
                  <course.icon size={24} />
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug text-ink">{course.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{course.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="pill bg-mint text-shonar">
                    <Clock size={12} />
                    {course.duration}
                  </span>
                  {course.mode && (
                    <span className="pill bg-cream text-ink/70 ring-1 ring-ink/10">
                      <MapPin size={12} />
                      {course.mode}
                    </span>
                  )}
                </div>
                {course.schedule && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-ink/60">
                    <CalendarDays size={14} className="text-shonar" />
                    {course.schedule}
                  </p>
                )}

                <div className="mt-6 flex items-center justify-between border-t border-ink/10 pt-4">
                  <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-bold text-shonar transition-all group-hover:gap-2.5">
                    Enroll now
                    <ArrowRight size={16} />
                  </a>
                  {course.learnMoreHref && (
                    <a
                      href={course.learnMoreHref}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-ink/60 underline-offset-4 hover:text-ink hover:underline"
                    >
                      <FileText size={14} />
                      Syllabus
                    </a>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
