// src/services/api.jsx
import axios from 'axios';
import { getEnvVar } from '../utils/env';

// 프록시 사용 시 빈 문자열, 직접 연결 시 전체 URL
const API_BASE_URL = getEnvVar('VITE_API_BASE_URL', '');

const api = axios.create({ 
  baseURL: API_BASE_URL,
  timeout: 30000, // 타임아웃 30초로 증가
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
    
    updateIsActiveQueue: async (id, isActiveQueue = true) => {
      const response = await api.patch(`${API_ENDPOINTS.SURVEYS}/${id}/active-queue`, { 
        isActiveQueue: isActiveQueue 
      });
      return response.data;
    },
  
  getSurveyStats: async () => {
    const response = await api.get(API_ENDPOINTS.SURVEYS_STATS);
    return response.data;
  },
};

// Emotion API
export const emotionAPI = {
  /**
   * 세션 시작 (녹화 시작)
   * @returns {Promise<{sessionId: string, status: string}>}
   */
  startSession: async () => {
    const response = await api.post('/api/emotion/start-session');
    return response.data;
  },

  /**
   * 웹캠 감정 벡터 전송
   * @param {string} sessionId - 세션 ID
   * @param {number[]} webcamVector - 웹캠 감정 벡터 [anger, sad, neutral, happy, surprise]
   * @returns {Promise<{status: string}>}
   */
  pushWebcamVector: async (sessionId, webcamVector) => {
    const response = await api.post('/api/emotion/push-webcam', {
      sessionId,
      webcamVector
    });
    return response.data;
  },

  /**
   * 설문 데이터와 웹캠 데이터 융합
   * @param {string} sessionId - 세션 ID
   * @param {Object} surveyData - 설문 응답 데이터
   * @returns {Promise<{status: string, frameCount: number, surveyVector: number[], sessionData: Array}>}
   */
  fuseEmotionData: async (sessionId, surveyData) => {
    const response = await api.post('/api/emotion/fuse', {
      sessionId,
      surveyData
    });
    return response.data;
  },

  /**
   * 이미지 파일을 받아서 감정 분석 수행
   * @param {File} imageFile - 이미지 파일
   * @returns {Promise<{label: string, score: number, probs: number[], timestamp: string}>}
   */
  analyzeEmotionImage: async (imageFile) => {
    const form = new FormData();
    form.append('image', imageFile);
    
    // 타임아웃 설정 (10초 - Python 서버 방식으로 빠름)
    const timeout = 10000;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      const response = await api.post('/api/emotion/analyze', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
        signal: controller.signal,
        timeout: timeout
      });
      clearTimeout(timeoutId);
      return response.data;
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Network Error 처리
      if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        console.error('[API] Network Error 발생:', error);
        throw new Error('네트워크 오류가 발생했습니다. 서버 연결을 확인해주세요.');
      }
      
      // 타임아웃 처리
      if (error.code === 'ECONNABORTED' || error.message === 'canceled' || error.message.includes('시간이 초과')) {
        throw new Error('요청 시간이 초과되었습니다. (10초)');
      }
      
      throw error;
    }
  },
};
