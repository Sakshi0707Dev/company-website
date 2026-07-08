import { useState, useEffect, useRef } from 'react';
import { deleteEnquiry } from '../services/enquiryService';
import { useToast } from '../context/ToastContext';

export default function DeleteConfirmModal({ enquiry, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const addToast = useToast();
  const cancelRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    cancelRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      await deleteEnquiry(enquiry._id);
      addToast('Enquiry deleted successfully', 'success');
      onDeleted();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete enquiry');
    } finally {
      setLoading(false);
    }
  };

  if (!enquiry) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-desc"
    >
      <div className="bg-white rounded-xl w-full max-w-sm p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 id="delete-modal-title" className="text-lg font-semibold text-gray-900 mb-2">Delete Enquiry</h3>
          <p id="delete-modal-desc" className="text-sm text-gray-600 mb-1">
            Are you sure you want to delete this enquiry from
          </p>
          <p className="text-sm font-medium text-gray-900 mb-4">
            {enquiry.name} &mdash; {enquiry.subject}
          </p>

          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 mb-4" role="alert">{error}</div>
          )}

          <div className="flex gap-3">
            <button ref={cancelRef} onClick={onClose} disabled={loading} className="btn-secondary flex-1">
              Cancel
            </button>
            <button onClick={handleDelete} disabled={loading} className="btn-danger flex-1 inline-flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Deleting...
                </>
              ) : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
