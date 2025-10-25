// src/services/api.jsx
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const api = axios.create({ baseURL: API_BASE_URL });

export const surveyAPI = {
  createSurvey: async (payload) => {
    const response = await api.post('/api/surveys', payload);
    return response.data;
  },
  getSurveys: async (page = 1) => {
    const response = await api.get('/api/surveys', { params: { page } });
    return response.data;
  },
  updateSurvey: async (id, payload) => {
    const response = await api.put(`/api/surveys/${id}`, payload);
    return response.data;
  },
  deleteSurvey: async (id) => {
    const response = await api.delete(`/api/surveys/${id}`);
    return response.status;
  },
  getSurveyStats: async () => {
    const response = await api.get('/api/surveys/stats');
    return response.data;
  },
};
