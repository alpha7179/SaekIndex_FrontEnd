// src/constants/index.js

// API 관련 상수
export const API_ENDPOINTS = {
  SURVEYS: '/api/surveys',
  SURVEYS_STATS: '/api/surveys/stats',
  MARK_VIEWED: (id) => `/api/surveys/mark-viewed/${id}`,
};

// React Query 설정
export const QUERY_KEYS = {
  SURVEYS: 'surveys',
  SURVEY_STATS: 'survey-stats',
};

// 기본 설정값
export const DEFAULT_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
  },
  TOAST: {
    AUTO_CLOSE: 3000,
    POSITION: 'bottom-right',
  },
  QUERY: {
    STALE_TIME: 1000 * 60 * 5, // 5분
    RETRY: 1,
  },
};

// 언어 설정
export const SUPPORTED_LANGUAGES = {
  KO: 'ko',
  EN: 'en',
};