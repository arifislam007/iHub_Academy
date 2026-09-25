import { Target, Users, Award, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export function WhyChoose() {
  const reasons = [
    {
      icon: Target,
      title: 'Practical Training',
      description: 'Hands-on practice with real-world projects, not just theory.',
    },
    {
      icon: Users,
      title: 'Small Batches',
      description: 'Limited seats ensure individual attention for every student.',
    },
    {
      icon: Award,
      title: 'Certificate',
      description: 'Get recognized for your skills with our completion certificates.',
    },
    {
      icon: Briefcase,
      title: 'Career Support',
      description: 'Guidance for jobs, freelancing, and international marketplace success.',
    },
  ];

  return (
    <section className="section-pad bg-cream" id="why-us">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="section-eyebrow mb-5">Our strengths</span>
          <h2 className="section-title">
            Why choose <span className="text-shonar">Sombhabona</span>?
          </h2>
          <p className="section-lede mt-4">
            Excellence in education through a practical, people-first approach to skill development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-white p-7 ring-1 ring-ink/8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(14,42,34,0.45)]"
            >
              <span className="absolute right-6 top-5 font-[family-name:var(--font-display)] text-5xl font-semibold text-mint transition-colors group-hover:text-sprout/40">
                0{index + 1}
              </span>
              <div className="icon-tile h-14 w-14 group-hover:bg-shonar group-hover:text-white">
                <reason.icon size={26} />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-ink">{reason.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/65">{reason.description}</p>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-sunrise transition-transform duration-300 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
