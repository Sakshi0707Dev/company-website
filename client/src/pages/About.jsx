const stats = [
  { label: 'Years in Business', value: '5+' },
  { label: 'Projects Delivered', value: '150+' },
  { label: 'Happy Clients', value: '100+' },
  { label: 'Team Members', value: '40+' },
];

const values = [
  {
    title: 'Innovation',
    description: 'We stay ahead of the curve, leveraging the latest technologies to deliver cutting-edge solutions.',
  },
  {
    title: 'Quality',
    description: 'Every line of code we write meets the highest standards of quality, security, and performance.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients, treating their vision as our own.',
  },
  {
    title: 'Integrity',
    description: 'Transparency and honesty form the foundation of every client relationship.',
  },
];

export default function About() {
  return (
    <>
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Apex Solutions
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Founded in 2020, Apex Solutions has grown from a small team of passionate
              developers into a full-service technology company serving clients across
              multiple industries. Our mission is simple: empower businesses with
              technology that drives real results.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every project we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white p-8 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
