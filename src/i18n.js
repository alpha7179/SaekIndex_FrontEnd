/* src/i18n.js */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng: 'ko',
    fallbackLng: 'ko',
    
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;