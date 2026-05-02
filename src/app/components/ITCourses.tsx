import { Monitor, TrendingUp, Wrench, Laptop, Terminal, Award, Container, Cloud, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function ITCourses() {
  const foundationCourses = [
    {
      title: 'Graphic Design & Freelancing',
      description: 'Master Photoshop and design workflows to start freelancing confidently.',
      duration: '2 Months',
      mode: 'Online/Offline',
      icon: Monitor,
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Digital Marketing & Freelancing',
      description: 'Learn SEO, ads, and social media strategy for business growth and freelancing.',
      duration: '3 Months',
      mode: 'Online/Offline',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'IT Support',
      description: 'Develop troubleshooting and system support skills for modern workplaces.',
      duration: '1.5 Months',
      mode: 'Offline',
      icon: Wrench,
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: 'Basic Computer Operation',
      description: 'Build confidence with core computer, internet, and office productivity tasks.',
      duration: '1 Month',
      mode: 'Online/Offline',
      icon: Laptop,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const advancedCourses = [
    {
      title: 'Linux Operation for Beginner',
      description: 'Learn Linux fundamentals, shell commands, and server basics through labs.',
      duration: '2 Months',
      mode: 'Online/Offline',
      icon: Terminal,
      color: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'RHCSA & RHCE Exam Preparation',
      description: 'Structured Red Hat certification prep with guided practice and mock tests.',
      duration: '3 Months',
      mode: 'Offline',
      icon: Award,
      color: 'from-red-500 to-pink-500',
    },
    {
      title: 'DevOps & Docker',
      description: 'Ship faster with CI/CD basics, containers, and practical DevOps workflows.',
      duration: '3 Months',
      mode: 'Online/Offline',
      icon: Container,
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'AWS Cloud for Beginner',
      description: 'Get hands-on with EC2, networking, security, and cloud deployment basics.',
      duration: '2 Months',
      mode: 'Online/Offline',
      icon: Cloud,
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full mb-6 text-sm font-semibold">
            🔥 50% OFF ON SELECTED PROGRAMS
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            IT & Professional Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Practical, hands-on training designed for the modern digital workplace
          </p>
        </motion.div>

        <div className="mb-20">
          <h3 className="text-3xl mb-10 text-center">Foundation Courses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {foundationCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50" />
                <div className="relative z-10">
                  <div className={`bg-gradient-to-br ${course.color} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                    <course.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-xl mb-3 font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">{course.description}</p>
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium">{course.duration}</span>
                    <span className="text-gray-500">{course.mode}</span>
                  </div>
                  <a href="#contact" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                    Learn More
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl mb-10 text-center">Advanced & Certification</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advancedCourses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-purple-200 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-2xl opacity-30" />
                <div className="relative z-10">
                  <div className={`bg-gradient-to-br ${course.color} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                    <course.icon className="text-white" size={32} />
                  </div>
                  <h4 className="text-xl mb-3 font-semibold text-gray-900">{course.title}</h4>
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">{course.description}</p>
                  <div className="flex justify-between items-center mb-6 text-sm">
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">{course.duration}</span>
                    <span className="text-gray-500">{course.mode}</span>
                  </div>
                  <a href="#contact" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                    Learn More
                    <ArrowRight size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
