export default {
  slug: 'css2020',
  name: 'State of CSS',
  year: 2020,
  status: 2, // open
  imageUrl: 'stateofcss2020.png',
  outline: [
  {
    title: 'Syntax',
    description: 'The grammar of CSS',
    template: 'feature',
    slug: 'features',
    questions: [
      {
        title: 'Destructuring',
        description: 'Example: <code>const { foo } = bar</code>'
      },
      {
        title: 'Spread operator',
        description: 'Example: <code>[...array1, ...array2]</code>'
      },
      {
        title: 'Arrow Functions',
        description: 'Example: <code>const foo = () => {}</code>'
      }
    ]
  },
  {
    title: 'Language',
    description: 'The vocabulary of CSS',
    template: 'feature',
    slug: 'features',
    questions: ['Proxies', 'Async/Await', 'Promises', 'Decorators']
  },
  {
    title: 'Data Structures',
    description: 'How you store and manipulate data',
    template: 'feature',
    slug: 'features',
    questions: ['Maps', 'Sets', 'Typed Arrays', 'Array.prototype.flat']
  },
  {
    title: 'Browser APIs',
    description: 'The features provided by the browser',
    template: 'feature',
    slug: 'features',
    questions: [
      'Service Workers',
      'LocalStorage',
      'i18n',
      'Web Components',
      'Web Audio API',
      'WebGL',
      'Web Animations API',
      'WebRTC',
      'Web Speech API',
      'WebVR',
      'Websocket',
      'Fetch API'
    ]
  },
  {
    title: 'Other Features',
    description: 'Other technologies and patterns',
    template: 'feature',
    slug: 'features',
    questions: ['Progressive Web Apps (PWA)', 'WebAssembly (WASM)']
  },
  {
    title: 'Patterns',
    description: 'How you prefer writing code',
    template: 'pattern',
    slug: 'patterns',
    questions: [
      'Object-Oriented Programming',
      'Functional Programming',
      'Reactive Programming'
    ]
  },
  {
    title: 'CSS Flavors',
    description: 'Languages that compile to CSS',
    template: 'tool',
    slug: 'tools',
    id: 'flavors',
    questions: [
      'TypeScript',
      'Reason',
      'Elm',
      'ClojureScript',
      'PureScript',
      {
        title: 'Other CSS Flavors',
        description:
          'Other CSS flavors you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of CSS flavors?',
        template: 'happiness'
      }
    ]
  },
  {
    title: 'Front-end Frameworks',
    description: 'Front-end frameworks and libraries',
    template: 'tool',
    slug: 'tools',
    id: 'frontend',
    questions: [
      'React',
      'Vue',
      'Angular',
      'Preact',
      'Ember',
      'Svelte',
      {
        title: 'Other Front-end Frameworks',
        description:
          'Other Front-end frameworks you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of front-end frameworks?',
        template: 'happiness'
      }
    ]
  },
  {
    title: 'Data Layer',
    description: 'Loading and managing data in your app',
    template: 'tool',
    slug: 'tools',
    id: 'datalayer',
    questions: [
      'Redux',
      'Apollo',
      'GraphQL',
      'MobX',
      'Relay',
      {
        title: 'Other Data Layer Tools',
        description:
          'Other data layer tools you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of data layer technologies?',
        template: 'happiness'
      }
    ]
  },
  {
    title: 'Back-end Frameworks',
    description: 'CSS on the server',
    template: 'tool',
    slug: 'tools',
    id: 'backend',
    questions: [
      'Express',
      'Next.js',
      'Koa',
      'Meteor',
      'Sails',
      'FeathersJS',
      'Nuxt.js',
      'Gatsby.js',
      {
        title: 'Other Back-end Frameworks',
        description:
          'Other back-end frameworks you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of back-end frameworks?',
        template: 'happiness'
      }
    ]
  },
  {
    title: 'Testing',
    description: 'Tools for testing your code',
    template: 'tool',
    slug: 'tools',
    id: 'testing',
    questions: [
      'Jest',
      'Mocha',
      'Storybook',
      'Cypress',
      'Enzyme',
      'Ava',
      'Jasmine',
      'Puppeteer',
      {
        title: 'Other Testing Tools',
        description:
          'Other testing tools you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of testing tools?',
        template: 'happiness'
      }
    ]
  },
  {
    title: 'Mobile & Desktop',
    description: 'CSS for mobile devices and desktop apps',
    template: 'tool',
    slug: 'tools',
    id: 'mobiledesktop',
    questions: [
      'Electron',
      'React Native',
      'Native Apps',
      'Cordova',
      'Ionic',
      'NW.js',
      'Expo',
      {
        title: 'Other Mobile & Desktop Tools',
        description:
          'Other mobile & desktop tools you use not mentioned in the list above',
        template: 'text'
      },
      {
        title: 'Overall Happiness',
        description:
          'On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of mobile & desktop tools?',
        template: 'happiness'
      }
    ]
  }
]};