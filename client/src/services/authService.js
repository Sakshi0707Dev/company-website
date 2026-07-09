import api from './api';
console.log("authService module loaded");

export const login = async (email, password) => {
  console.log("authService.login called with:", { email, password: "***" });
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};
