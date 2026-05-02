import { Target, Users, Award, Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export function WhyChoose() {
  const reasons = [
    {
      icon: Target,
      title: 'Practical Training',
      description: 'Hands-on practice with real-world projects, not just theory.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Users,
      title: 'Small Batches',
      description: 'Limited seats ensure individual attention for every student.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Award,
      title: 'Certificate',
      description: 'Get recognized for your skills with our completion certificates.',
      color: 'from-orange-500 to-amber-500',
    },
    {
      icon: Briefcase,
      title: 'Career Support',
      description: 'Guidance for jobs, freelancing, and international marketplace success.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50" id="why-us">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6 text-sm font-semibold">
            OUR STRENGTHS
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Sombhabona?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience excellence in education with our unique approach to skill development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all text-center relative overflow-hidden"
            >
              {/* Animated gradient background */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`bg-gradient-to-br ${reason.color} p-5 rounded-2xl shadow-lg`}
                  >
                    <reason.icon className="text-white" size={36} />
                  </motion.div>
                </div>
                <h3 className="text-2xl mb-4 font-bold text-gray-900">{reason.title}</h3>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
              </div>

              {/* Decorative corner accent */}
              <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${reason.color} rounded-tl-full opacity-10`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
