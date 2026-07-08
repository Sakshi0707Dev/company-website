import { useState } from 'react';
import { createEnquiry } from '../services/enquiryService';

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };

const validate = (values) => {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Please provide a valid email';
  }
  if (!values.phone.trim() || !/^\+?[\d\s\-()]{7,20}$/.test(values.phone)) {
    errors.phone = 'Please provide a valid phone number';
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = 'Subject must be at least 3 characters';
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await createEnquiry(form);
      setStatus({ type: 'success', message: 'Enquiry submitted successfully! We will get back to you soon.' });
      setForm(initialForm);
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600">
              Have a question or want to discuss a project? We'd love to hear from you.
            </p>
          </div>

          {status.message && (
            <div
              className={`p-4 rounded-lg mb-6 text-sm font-medium ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition`}
                  placeholder="John Doe"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    errors.subject ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition`}
                  placeholder="How can we help?"
                />
                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.message ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition resize-y`}
                placeholder="Tell us about your project..."
              />
              {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-primary-600 font-semibold mb-1">Email</div>
                <div className="text-gray-600">info@apexsolutions.com</div>
              </div>
              <div>
                <div className="text-primary-600 font-semibold mb-1">Phone</div>
                <div className="text-gray-600">+1 (555) 123-4567</div>
              </div>
              <div>
                <div className="text-primary-600 font-semibold mb-1">Address</div>
                <div className="text-gray-600">San Francisco, CA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
