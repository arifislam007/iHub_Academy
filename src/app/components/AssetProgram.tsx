import { Award, TrendingUp, Palette, Headphones, CheckCircle, Download } from 'lucide-react';
import { motion } from 'motion/react';

export function AssetProgram() {
  const programs = [
    {
      title: 'Digital Marketing for Freelancing - Level 3',
      description: 'Turn clicks into customers with SEO, paid ads, content strategy, and analytics-driven growth.',
      duration: '3 Months',
      type: 'Asset Program',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      features: ['SEO Mastery', 'Paid Advertising', 'Content Strategy', 'Analytics'],
    },
    {
      title: 'Graphics Design for Freelancing - Level 3',
      description: 'Master advanced Photoshop/Illustrator, brand identity, and visual storytelling for premium clients.',
      duration: '3 Months',
      type: 'Asset Program',
      icon: Palette,
      color: 'from-purple-500 to-pink-500',
      features: ['Photoshop Pro', 'Illustrator', 'Brand Identity', 'Portfolio'],
    },
    {
      title: 'IT Support - Level 3',
      description: 'Build technical support expertise in hardware, networking, cloud basics, security, and OS management.',
      duration: '3 Months',
      type: 'Asset Program',
      icon: Headphones,
      color: 'from-orange-500 to-red-500',
      features: ['Hardware', 'Networking', 'Cloud Basics', 'Security'],
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden" id="admission">
      {/* Background decorations */}
      <div className="absolute top-20 left-0 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-4 rounded-2xl">
              <Award className="text-white" size={48} />
            </div>
          </div>
          <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full mb-6 text-sm font-semibold">
            GOVERNMENT CERTIFIED
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Asset Program With NSDA
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional certification programs in partnership with National Skills Development Authority
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${program.color} rounded-bl-full opacity-10`} />

              <div className="relative z-10">
                <div className={`bg-gradient-to-br ${program.color} p-4 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform`}>
                  <program.icon className="text-white" size={32} />
                </div>

                <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-semibold inline-block mb-4">
                  {program.type}
                </div>

                <h3 className="text-2xl mb-4 font-bold text-gray-900">{program.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>

                <div className="mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                    <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">{program.duration}</span>
                  </div>

                  <div className="space-y-2">
                    {program.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a href="#contact" className={`w-full bg-gradient-to-r ${program.color} text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all block text-center`}>
                  Enroll Now
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
          className="text-center flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contact"
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
          >
            Enroll Now
          </a>
          <a href="/sombhabona_courses.pdf" target="_blank" rel="noreferrer" className="bg-white text-green-600 border-2 border-green-600 px-10 py-4 rounded-full font-semibold hover:bg-green-50 transition-all flex items-center justify-center gap-2">
            <Download size={20} />
            Download Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
}
