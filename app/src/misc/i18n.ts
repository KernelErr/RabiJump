import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

import { resources } from "@app/i18n/resources"

i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        debug: process.env.NODE_ENV === 'development',
        resources,
        supportedLngs: ['en', 'zh'],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    })

export default i18next