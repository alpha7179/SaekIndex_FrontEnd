// src/hooks/useLanguage.js
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '../constants';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    if (Object.values(SUPPORTED_LANGUAGES).includes(lang)) {
      i18n.changeLanguage(lang);
    }
  };

  const isCurrentLanguage = (lang) => {
    return i18n.language === lang;
  };

  return {
    t,
    currentLanguage: i18n.language,
    changeLanguage,
    isCurrentLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};