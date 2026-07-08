import { useState, useEffect } from 'react';
import { updateEnquiry } from '../services/enquiryService';

const validate = (values) => {
  const errors = {};
  if (!values.name.trim() || values.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!values.email.trim() || !/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Please provide a valid email';
  if (!values.phone.trim() || !/^\+?[\d\s\-()]{7,20}$/.test(values.phone)) errors.phone = 'Please provide a valid phone number';
  if (!values.subject.trim() || values.subject.trim().length < 3) errors.subject = 'Subject must be at least 3 characters';
  if (!values.message.trim() || values.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
  return errors;
};

export default function EditEnquiryModal({ enquiry, onClose, onSaved }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (enquiry) {
      setForm({
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        subject: enquiry.subject,
        message: enquiry.message,
      });
    }
  }, [enquiry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);
    try {
      await updateEnquiry(enquiry._id, form);
      onSaved();
    } catch (err) {
      setServerError(err.response?.data?.message || 'Failed to update enquiry');
    } finally {
      setLoading(false);
    }
  };

  if (!enquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Edit Enquiry</h2>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {serverError && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">{serverError}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input name="name" value={form.name || ''} onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${errors.name ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`} />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" value={form.email || ''} onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`} />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input name="phone" value={form.phone || ''} onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${errors.phone ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`} />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input name="subject" value={form.subject || ''} onChange={handleChange}
                className={`w-full px-3 py-2 rounded-lg border text-sm ${errors.subject ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`} />
              {errors.subject && <p className="mt-1 text-xs text-red-600">{errors.subject}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea name="message" rows={4} value={form.message || ''} onChange={handleChange}
              className={`w-full px-3 py-2 rounded-lg border text-sm resize-y ${errors.message ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-primary-500`} />
            {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 transition-colors">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
