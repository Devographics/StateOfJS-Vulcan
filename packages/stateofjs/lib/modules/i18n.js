import { registerLocale } from 'meteor/vulcan:core';

export const locales = [
  {
    id: 'ca-ES',
    label: 'Català',
  },
  {
    id: 'cs-CZ',
    label: 'Česky',
  },
  {
    id: 'de-DE',
    label: 'Deutsch',
  },
  {
    id: 'en-US',
    label: 'English',
  },
  {
    id: 'es-ES',
    label: 'Español',
  },
  {
    id: 'fa-IR',
    label: 'فارسی',
    rtl: true,
  },
  {
    id: 'fr-FR',
    label: 'Français',
  },
  { id: 'gl-ES', label: 'Galego' },
  {
    id: 'hi-IN',
    label: 'Hindi',
  },
  {
    id: 'it-IT',
    label: 'Italiano',
  },
  {
    id: 'pt-PT',
    label: 'Português',
  },
  {
    id: 'ru-RU',
    label: 'Русский',
  },
  {
    id: 'ua-UA',
    label: 'Українська',
  },
  {
    id: 'sv-SE',
    label: 'Svenska',
  },
  {
    id: 'tr-TR',
    label: 'Türkçe',
  },
  {
    id: 'id-ID',
    label: 'Indonesia',
  },
  {
    id: 'zh-Hans',
    label: '简体中文',
  },
  {
    id: 'zh-Hant',
    label: '正體中文',
  },

  {
    id: 'ja-JP',
    label: '日本語',
  },
  {
    id: 'pl-PL',
    label: 'Polski',
  },
  {
    id: 'ko-KR',
    label: '한국어',
  },
  {
    id: 'nl-NL',
    label: 'Nederlands',
  },
  {
    id: 'ro-RO',
    label: 'Română',
  },
  {
    id: 'hu-HU',
    label: 'Magyar',
  },
];

// export const convertStrings = (stringFile) => {
//   const convertedStrings = {};
//   const { namespace, translations } = stringFile;
//   translations.forEach(({ key, t }) => {
//     // survey namespaces are not currently supported
//     // const translationKey = namespace ? `${namespace}.${key}`: key;
//     const translationKey = key;
//     convertedStrings[translationKey] = t;
//   });
//   return convertedStrings;
// };

locales.forEach((locale) => {
  const { id, stringFiles, label, rtl } = locale;
  registerLocale({
    id,
    label,
    dynamic: true,
    rtl,
  });

  // if (id === 'en') {
  //   // add en language to client bundle so it can act as a fallback
  //   stringFiles.forEach((stringFile) => {
  //     addStrings(id, convertStrings(stringFile));
  //   });
  // }
});
