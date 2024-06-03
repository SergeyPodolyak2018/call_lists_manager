import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

export const defaultNS = 'translation';

i18next
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: false,
    fallbackLng: 'en',
    defaultNS,
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: `/customer/ui/locales/{{lng}}/{{ns}}.json`,
    },
  });

export default i18next;
