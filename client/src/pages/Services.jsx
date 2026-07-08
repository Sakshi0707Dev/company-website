const services = [
  {
    title: 'Web Development',
    description:
      'From simple landing pages to complex web applications, we build responsive, performant, and scalable web solutions using React, Node.js, and modern frameworks.',
    features: [
      'Custom Web Applications',
      'Single Page Applications',
      'Progressive Web Apps',
      'API Development & Integration',
      'Performance Optimization',
    ],
  },
  {
    title: 'Mobile App Development',
    description:
      'Native and cross-platform mobile applications that deliver seamless user experiences across iOS and Android devices.',
    features: [
      'React Native Development',
      'iOS & Android Apps',
      'App Store Deployment',
      'Push Notifications',
      'Offline Capabilities',
    ],
  },
  {
    title: 'Cloud Solutions',
    description:
      'Scalable cloud infrastructure design, migration, and management services to keep your applications running smoothly.',
    features: [
      'AWS & Azure Architecture',
      'Cloud Migration',
      'DevOps & CI/CD',
      'Containerization (Docker)',
      'Monitoring & Alerting',
    ],
  },
  {
    title: 'AI & Machine Learning',
    description:
      'Intelligent automation and data-driven solutions to optimize business processes and unlock valuable insights.',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Process Automation',
      'Data Visualization',
      'Recommendation Engines',
    ],
  },
];

export default function Services() {
  return (
    <>
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to help your business
              thrive in the digital age.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="border border-gray-200 rounded-xl p-8 hover:border-primary-200 hover:shadow-lg transition-all"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-gray-600">
                      <svg
                        className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
