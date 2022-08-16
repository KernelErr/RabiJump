import i18next from "i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import moment from "moment"

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
            escapeValue: false,
            format: function (value, format, lng) {
                if (value instanceof Date) return moment(value).format(format)
                return value
            }
        }
    })

export default i18next