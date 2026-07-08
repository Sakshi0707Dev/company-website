import api from './api';

export const createEnquiry = async (formData) => {
  const { data } = await api.post('/enquiries', formData);
  return data;
};

export const getEnquiries = async (params = {}) => {
  const { data } = await api.get('/enquiries', { params });
  return data;
};

export const getEnquiry = async (id) => {
  const { data } = await api.get(`/enquiries/${id}`);
  return data;
};

export const updateEnquiry = async (id, formData) => {
  const { data } = await api.put(`/enquiries/${id}`, formData);
  return data;
};

export const deleteEnquiry = async (id) => {
  const { data } = await api.delete(`/enquiries/${id}`);
  return data;
};
