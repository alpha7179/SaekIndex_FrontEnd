// src/services/api.jsx
import axios from 'axios';
import { getEnvVar } from '../utils/env';

const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', 'http://localhost:4000');

const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 응답 인터셉터 추가 - 에러 처리 개선
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

import { API_ENDPOINTS, DEFAULT_CONFIG } from '../constants';

export const surveyAPI = {
  createSurvey: async (payload) => {
    const response = await api.post(API_ENDPOINTS.SURVEYS, payload);
    return response.data;
  },
  
  getSurveys: async (page = DEFAULT_CONFIG.PAGINATION.DEFAULT_PAGE) => {
    const response = await api.get(API_ENDPOINTS.SURVEYS, { params: { page } });
    return response.data;
  },
  
  updateSurvey: async (id, payload) => {
    const response = await api.put(`${API_ENDPOINTS.SURVEYS}/${id}`, payload);
    return response.data;
  },
  
  deleteSurvey: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.SURVEYS}/${id}`);
    return response.status;
  },
  
    updateIsViewed: async (id, isViewed = true) => {
      const response = await api.patch(`${API_ENDPOINTS.SURVEYS}/${id}/viewed`, { 
        isViewed: isViewed 
      });
      return response.data;
    },
    
    toggleIsViewed: async (id, currentIsViewed) => {
        const response = await api.patch(`${API_ENDPOINTS.SURVEYS}/${id}/viewed`, { 
            isViewed: !currentIsViewed 
        });
        return response.data;
    },
  
  getSurveyStats: async () => {
    const response = await api.get(API_ENDPOINTS.SURVEYS_STATS);
    return response.data;
  },
};
