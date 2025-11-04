// src/utils/env.js

/**
 * 환경 변수를 안전하게 가져오는 유틸리티
 */
export const getEnvVar = (key, defaultValue = '') => {
  const value = import.meta.env[key];
  
  if (!value && !defaultValue) {
    console.warn(`Environment variable ${key} is not defined`);
  }
  
  return value || defaultValue;
};

/**
 * 필수 환경 변수 검증
 */
export const validateRequiredEnvVars = (requiredVars) => {
  const missing = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    return false;
  }
  
  return true;
};

// 환경별 설정
export const isDevelopment = import.meta.env.DEV;
export const isProduction = import.meta.env.PROD;