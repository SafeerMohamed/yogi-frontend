import axios from 'axios';

// In dev, use Vite proxy (/api → localhost:5000) unless VITE_API_URL is explicitly set
const envUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
const baseURL = envUrl ? `${envUrl}/api` : '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('zuntrist_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.url?.includes('/auth/')) {
      localStorage.removeItem('zuntrist_token');
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

export const postsAPI = {
  getAll: (params) => api.get('/posts', { params }),
  getOne: (id) => api.get(`/posts/${id}`),
  create: (formData) =>
    api.post('/posts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  like: (id) => api.put(`/posts/like/${id}`),
  save: (id) => api.put(`/posts/save/${id}`),
  comment: (id, text) => api.post(`/posts/${id}/comments`, { text }),
  getRelated: (id) => api.get(`/posts/${id}/related`),
  delete: (id) => api.delete(`/posts/${id}`),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  getByUsername: (username) => api.get(`/users/${username}`),
  follow: (id) => api.put(`/users/follow/${id}`),
  getCreators: () => api.get('/users/creators'),
  updateProfile: (formData) =>
    api.put('/users/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

export default api;
