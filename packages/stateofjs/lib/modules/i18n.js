import { registerLocale, addStrings } from 'meteor/vulcan:core';

export const locales = [
  {
    id: 'cs-CZ',
    label: 'Česky',
    translators: ['adamkudrna'],
  },
  {
    id: 'de-DE',
    label: 'Deutsch',
    translators: ['abaldeweg'],
  },
  {
    id: 'en-US',
    label: 'English',
    translators: [],
  },
  {
    id: 'es-ES',
    label: 'Español',
    translators: ['timbergus', 'ezkato'],
  },
  {
    id: 'fr-FR',
    label: 'Français',
    translators: ['arnauddrain'],
  },
  {
    id: 'hi-IN',
    label: 'Hindi',
    translators: ['jaideepghosh'],
  },
  {
    id: 'id-ID',
    label: 'Indonesia',
    translators: ['ervinismu'],
  },
  {
    id: 'it-IT',
    label: 'Italiano',
    translators: ['polettoweb'],
  },
  {
    id: 'pt-PT',
    label: 'Português',
    translators: ['danisal'],
  },
  {
    id: 'ru-RU',
    label: 'Русский',
    translators: ['lex111', 'Omhet'],
  },
  {
    id: 'sv-SE',
    label: 'Svenska',
    translators: ['m-hagberg'],
  },
  {
    id: 'tr-TR',
    label: 'Türkçe',
    translators: ['berkayyildiz'],
  },
  {
    id: 'zh-Hant',
    label: '正體中文',
    translators: ['ymcheung'],
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
  const { id, stringFiles, label } = locale;
  registerLocale({
    id,
    label,
    dynamic: true,
  });

  // if (id === 'en') {
  //   // add en language to client bundle so it can act as a fallback
  //   stringFiles.forEach((stringFile) => {
  //     addStrings(id, convertStrings(stringFile));
  //   });
  // }
});
