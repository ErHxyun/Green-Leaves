import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/common.json';
import cn from '../locales/cn/common.json';

const resources = {
	en: { translation: en },
	cn: { translation: cn },
};

const savedLng = typeof window !== 'undefined' ? window.localStorage.getItem('lng') : null;

void i18n.use(initReactI18next).init({
	resources,
	lng: savedLng || 'cn',
	fallbackLng: 'en',
	supportedLngs: ['en', 'cn'],
	nonExplicitSupportedLngs: true,
	interpolation: { escapeValue: false },
});

export default i18n;
