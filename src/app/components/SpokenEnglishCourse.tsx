import { BookOpen, Mic, Users, Video, MessageCircle, UserCheck, Star } from 'lucide-react';
import { motion } from 'motion/react';

export function SpokenEnglishCourse() {
  const features = [
    { icon: BookOpen, text: 'Learning by Doing', color: 'from-blue-500 to-cyan-500' },
    { icon: BookOpen, text: 'Grammar & Vocabulary', color: 'from-purple-500 to-pink-500' },
    { icon: Mic, text: 'Public Speaking', color: 'from-orange-500 to-red-500' },
    { icon: Video, text: 'Multimedia Classroom', color: 'from-green-500 to-emerald-500' },
    { icon: MessageCircle, text: 'Language Club', color: 'from-yellow-500 to-orange-500' },
    { icon: UserCheck, text: 'Personal Mentoring', color: 'from-indigo-500 to-purple-500' },
  ];

  const courses = [
    {
      level: '1. Beginner',
      duration: '3 Months',
      schedule: 'Fri & Sat (2 Hrs/Class)',
      fee: 'Adm: 2,000 / Monthly: 1,500 TK',
      popular: false,
    },
    {
      level: '2. Intermediate',
      duration: '3 Months',
      schedule: 'Fri & Sat (2 Hrs/Class)',
      fee: 'Adm: 2,000 / Monthly: 1,500 TK',
      popular: false,
    },
    {
      level: '3. Advanced',
      duration: '3 Months',
      schedule: 'Fri & Sat (2 Hrs/Class)',
      fee: 'Adm: 2,000 / Monthly: 1,500 TK',
      popular: false,
    },
    {
      level: '4. Full Programme',
      duration: '9 Months',
      schedule: 'Fri & Sat (2 Hrs/Class)',
      fee: 'Adm: 2,000 / Monthly: 1,500 TK',
      popular: true,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white" id="courses">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6 text-sm font-semibold">
            FEATURED COURSE
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Spoken English Course
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Better English, Better Future. A practical and interactive course for real-life success.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${feature.color} p-3 rounded-xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={28} />
              </div>
              <p className="text-sm font-medium text-gray-700">{feature.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {courses.map((course, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 ${
                course.popular ? 'border-purple-500' : 'border-transparent hover:border-purple-200'
              }`}
            >
              {course.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <Star size={14} fill="currentColor" />
                  Most Popular
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {course.level}
                </h3>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Schedule:</span>
                  <span className="font-semibold text-gray-900 text-sm">{course.schedule}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Fees</p>
                    <p className="text-lg font-bold text-purple-600">{course.fee}</p>
                  </div>
                </div>
              </div>
              <a href="#contact" className={`w-full py-3 rounded-xl font-semibold transition-all text-center block ${
                course.popular
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                Enroll Now
              </a>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 p-10 rounded-3xl border border-purple-100"
        >
          <h3 className="text-3xl mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Who Can Join?
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            This course is perfect for <span className="font-semibold text-purple-600">School & College Students</span>,
            <span className="font-semibold text-purple-600"> University Students</span>,
            <span className="font-semibold text-purple-600"> Job Seekers</span>,
            <span className="font-semibold text-purple-600"> Freelancers</span>, and
            <span className="font-semibold text-purple-600"> Professionals</span> who want to improve their English communication skills
            for career growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
