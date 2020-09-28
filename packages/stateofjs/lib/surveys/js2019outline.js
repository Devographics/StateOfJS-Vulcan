export default {
   "slug": "js2019",
   "name": "State of JavaScript",
   "year": 2019,
   "status": 3,
   "imageUrl": "stateofjs2019.png",
   "outline": [
      {
         "title": "Syntax",
         "description": "The grammar of JavaScript",
         "template": "feature",
         "slug": "features",
         "questions": [
            {
               "title": "Destructuring",
               "id": "destructuring",
               "description": "Example: <code>const { foo } = bar</code>"
            },
            {
               "title": "Spread operator",
               "id": "spread_operator",
               "description": "Example: <code>[...array1, ...array2]</code>"
            },
            {
               "title": "Arrow Functions",
               "id": "arrow_functions",
               "description": "Example: <code>const foo = () => {}</code>"
            }
         ]
      },
      {
         "title": "Language",
         "description": "The vocabulary of JavaScript",
         "template": "feature",
         "slug": "features",
         "questions": [
            {
               "title": "Proxies",
               "id": "proxies"
            },
            {
               "title": "Async/Await",
               "id": "async_await"
            },
            {
               "title": "Promises",
               "id": "promises"
            },
            {
               "title": "Decorators",
               "id": "decorators"
            }
         ]
      },
      {
         "title": "Data Structures",
         "description": "How you store and manipulate data",
         "template": "feature",
         "slug": "features",
         "questions": [
            {
               "title": "Maps",
               "id": "maps"
            },
            {
               "title": "Sets",
               "id": "sets"
            },
            {
               "title": "Typed Arrays",
               "id": "typed_arrays"
            },
            {
               "title": "Array.prototype.flat",
               "id": "array_prototype_flat"
            }
         ]
      },
      {
         "title": "Browser APIs",
         "description": "The features provided by the browser",
         "template": "feature",
         "slug": "features",
         "questions": [
            {
               "title": "Service Workers",
               "id": "service_workers"
            },
            {
               "title": "LocalStorage",
               "id": "local_storage"
            },
            {
               "title": "i18n",
               "id": "i18n"
            },
            {
               "title": "Web Components",
               "id": "web_components"
            },
            {
               "title": "Web Audio API",
               "id": "web_audio"
            },
            {
               "title": "WebGL",
               "id": "webgl"
            },
            {
               "title": "Web Animations API",
               "id": "web_animations"
            },
            {
               "title": "WebRTC",
               "id": "webrtc"
            },
            {
               "title": "Web Speech API",
               "id": "web_speech"
            },
            {
               "title": "WebVR",
               "id": "webvr"
            },
            {
               "title": "Websocket",
               "id": "websocket"
            },
            {
               "title": "Fetch API",
               "id": "fetch"
            }
         ]
      },
      {
         "title": "Other Features",
         "description": "Other technologies and patterns",
         "template": "feature",
         "slug": "features",
         "questions": [
            {
               "title": "Progressive Web Apps (PWA)",
               "id": "pwa"
            },
            {
               "title": "WebAssembly (WASM)",
               "id": "wasm"
            }
         ]
      },
      {
         "title": "Patterns",
         "description": "How you prefer writing code",
         "template": "pattern",
         "slug": "patterns",
         "questions": [
            {
               "title": "Object-Oriented Programming",
               "id": "object_oriented_programming"
            },
            {
               "title": "Functional Programming",
               "id": "functional_programming"
            },
            {
               "title": "Reactive Programming",
               "id": "reactive_programming"
            }
         ]
      },
      {
         "title": "JavaScript Flavors",
         "description": "Languages that compile to JavaScript",
         "template": "tool",
         "id": "javascript_flavors",
         "slug": "tools",
         "questions": [
            "TypeScript",
            "Reason",
            "Elm",
            "ClojureScript",
            "PureScript",
            {
               "title": "Other JavaScript Flavors",
               "id": "javascript_flavors",
               "description": "Other JavaScript flavors you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "front_end_frameworks",
               "sectionSlug": "happiness",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of JavaScript flavors?",
               "template": "happiness"
            }
         ]
      },
      {
         "title": "Front-end Frameworks",
         "description": "Front-end frameworks and libraries",
         "template": "tool",
         "id": "front_end_frameworks",
         "slug": "tools",
         "questions": [
            "React",
            "Vue",
            "Angular",
            "Preact",
            "Ember",
            "Svelte",
            {
               "title": "Other Front-end Frameworks",
               "id": "front_end_frameworks",
               "description": "Other Front-end frameworks you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "front_end_frameworks",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of front-end frameworks?",
               "template": "happiness",
               "sectionSlug": "happiness"
            }
         ]
      },
      {
         "title": "Data Layer",
         "description": "Loading and managing data in your app",
         "template": "tool",
         "id": "datalayer",
         "slug": "tools",
         "questions": [
            "Redux",
            "Apollo",
            "GraphQL",
            "MobX",
            "Relay",
            {
               "title": "Other Data Layer Tools",
               "id": "datalayer",
               "description": "Other data layer tools you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "datalayer",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of data layer technologies?",
               "template": "happiness",
               "sectionSlug": "happiness"
            }
         ]
      },
      {
         "title": "Back-end Frameworks",
         "description": "JavaScript on the server",
         "template": "tool",
         "id": "back_end_frameworks",
         "slug": "tools",
         "questions": [
            "Express",
            {
               "title": "Next.js",
               "id": "nextjs"
            },
            "Koa",
            "Meteor",
            "Sails",
            {
               "title": "FeathersJS",
               "id": "feathers"
            },
            {
               "title": "Nuxt.js",
               "id": "nuxtjs"
            },
            {
               "title": "Gatsby.js",
               "id": "gatsby"
            },
            {
               "title": "Other Back-end Frameworks",
               "id": "datalayer",
               "description": "Other back-end frameworks you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "datalayer",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of back-end frameworks?",
               "template": "happiness",
               "sectionSlug": "happiness"
            }
         ]
      },
      {
         "title": "Testing",
         "description": "Tools for testing your code",
         "template": "tool",
         "id": "testing",
         "slug": "tools",
         "questions": [
            "Jest",
            "Mocha",
            "Storybook",
            "Cypress",
            "Enzyme",
            "Ava",
            "Jasmine",
            "Puppeteer",
            {
               "title": "Other Testing Tools",
               "id": "testing",
               "description": "Other testing tools you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "testing",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of testing tools?",
               "template": "happiness",
               "sectionSlug": "happiness"
            }
         ]
      },
      {
         "title": "Mobile & Desktop",
         "description": "JavaScript for mobile devices and desktop apps",
         "template": "tool",
         "id": "mobile_desktop",
         "slug": "tools",
         "questions": [
            "Electron",
            {
               "title": "React Native",
               "id": "react_native"
            },
            {
               "title": "Native Apps",
               "id": "native_apps"
            },
            "Cordova",
            "Ionic",
            {
               "title": "NW.js",
               "id": "nwjs"
            },
            "Expo",
            {
               "title": "Other Mobile & Desktop Tools",
               "id": "mobile_desktop",
               "description": "Other mobile & desktop tools you use not mentioned in the list above",
               "template": "text",
               "sectionSlug": "sections_other_tools"
            },
            {
               "title": "Overall Happiness",
               "id": "mobile_desktop",
               "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of mobile & desktop tools?",
               "template": "happiness",
               "sectionSlug": "happiness"
            }
         ]
      },
      {
         "title": "Other Tools",
         "description": "For these tools & technologies, just check the ones that you use regularly.",
         "slug": "other_tools",
         "questions": [
            {
               "title": "Utilities",
               "id": "utilities",
               "description": "Which JavaScript utilities do you regularly use?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": true,
               "suffix": "choices",
               "options": [
                  "Immer",
                  "Lodash",
                  "Underscore",
                  "Moment",
                  "Date Fns",
                  "Ramda",
                  "jQuery",
                  "RxJS"
               ]
            },
            {
               "title": "Other Utilities",
               "id": "utilities",
               "suffix": "others",
               "template": "text",
               "description": "Other utilities you use not mentioned in the list above"
            },
            {
               "title": "Text Editors",
               "id": "text_editors",
               "description": "Which text editor(s) do you regularly use?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": true,
               "suffix": "choices",
               "options": [
                  "VS Code",
                  "Sublime Text",
                  "Atom",
                  "Vim",
                  "Emacs",
                  "Webstorm"
               ]
            },
            {
               "title": "Other Editors",
               "id": "text_editors",
               "suffix": "others",
               "template": "text",
               "description": "Other text editors you use not mentioned in the list above"
            },
            {
               "title": "Browsers",
               "id": "browsers",
               "description": "Which browser(s) do you work in primarily during initial development?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": false,
               "suffix": "choices",
               "options": [
                  "Edge",
                  "Chrome",
                  "Safari",
                  "Firefox"
               ]
            },
            {
               "title": "Other Browsers",
               "id": "browsers",
               "suffix": "others",
               "template": "text",
               "description": "Other browsers you use not mentioned in the list above"
            },
            {
               "title": "Build Tools",
               "id": "build_tools",
               "description": "Which build tools do you use to compile and bundle your code?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": false,
               "suffix": "choices",
               "options": [
                  "Webpack",
                  "Parcel",
                  "Gulp",
                  "RollUp",
                  "FuseBox",
                  "Browserify"
               ]
            },
            {
               "title": "Other Build Tools",
               "id": "build_tools",
               "suffix": "others",
               "template": "text",
               "description": "Other build tools you use not mentioned in the list above"
            },
            {
               "title": "Non-JS Languages",
               "id": "non_js_languages",
               "description": "Which other languages do you code in besides JavaScript and its flavors?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": false,
               "suffix": "choices",
               "options": [
                  "PHP",
                  "Ruby",
                  "Python",
                  "Go",
                  "Rust",
                  "Java",
                  "C/C++",
                  "Objective-C",
                  "Scala",
                  "Swift",
                  "C#",
                  ".NET",
                  "Haskell",
                  "OCaml",
                  "Dart"
               ]
            },
            {
               "title": "Other Languages",
               "id": "non_js_languages",
               "suffix": "others",
               "template": "text",
               "description": "Other languages you use not mentioned in the list above"
            }
         ]
      },
      {
         "title": "Resources",
         "description": "What JavaScript resources do you consult?",
         "slug": "resources",
         "questions": [
            {
               "title": "Blogs, News, & Magazines",
               "id": "blogs_news_magazines",
               "description": "Which JavaScript-related blogs/magazines/etc. do you read?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": true,
               "suffix": "choices",
               "options": [
                  "CSS Tricks",
                  "Smashing Magazine",
                  "CoDrops",
                  "SitePoint",
                  "David Walsh",
                  "DailyJS",
                  "Echo JS",
                  "Front-End Front",
                  "JavaScript Weekly",
                  "Dev.to",
                  "Best of JS"
               ]
            },
            {
               "title": "Other Blogs",
               "template": "text",
               "id": "blogs_news_magazines",
               "suffix": "others",
               "description": "Other blogs, etc. you read not mentioned in the list above"
            },
            {
               "title": "Sites & Courses",
               "id": "sites_courses",
               "description": "Which JavaScript-related sites/courses/etc. do you consult?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": true,
               "suffix": "choices",
               "options": [
                  "Stack Overflow",
                  "MDN",
                  "W3Schools",
                  "FreeCodeCamp",
                  "Codecademy",
                  "LevelUp Tutorials",
                  "Wes Bos Courses (CSSGrid.io, Flexbox.io, etc.)",
                  "Pluralsight",
                  "DesignCode"
               ]
            },
            {
               "title": "Other Courses",
               "template": "text",
               "description": "Other sites, courses, etc. you consult not mentioned in the list above",
               "id": "sites_courses",
               "suffix": "others"
            },
            {
               "title": "Podcasts",
               "id": "podcasts",
               "description": "Which JavaScript or programming-related podcasts do you listen to?",
               "template": "multiple",
               "allowmultiple": true,
               "allowother": true,
               "randomize": true,
               "suffix": "choices",
               "options": [
                  "Shop Talk Show",
                  "The Changelog",
                  "Syntax",
                  "JS Party",
                  "JavaScript Jabber",
                  "Full Stack Radio",
                  "Front End Happy Hour",
                  "JAMstack Radio",
                  "The Web Platform Podcast",
                  "Modern Web",
                  "CodePen Radio"
               ]
            },
            {
               "title": "Other Podcasts",
               "template": "text",
               "description": "Other podcasts you listen to not mentioned in the list above",
               "id": "podcasts",
               "suffix": "others"
            }
         ]
      },
      {
         "title": "Opinion Questions",
         "slug": "opinions",
         "description": "How do you feel about the state of JavaScript?",
         "questions": [
            {
               "title": "JavaScript is moving in the right direction",
               "id": "js_moving_in_right_direction",
               "template": "opinion"
            },
            {
               "title": "Building JavaScript apps is overly complex right now",
               "template": "opinion",
               "id": "building_js_apps_overly_complex"
            },
            {
               "title": "JavaScript is over-used online",
               "id": "js_over_used_online",
               "template": "opinion"
            },
            {
               "title": "I enjoy building JavaScript apps",
               "id": "enjoy_building_js_apps",
               "template": "opinion"
            },
            {
               "title": "I would like JavaScript to be my main programming language",
               "template": "opinion",
               "id": "would_like_js_to_be_main_lang"
            },
            {
               "title": "The JavaScript ecosystem is changing too fast",
               "id": "js_ecosystem_changing_to_fast",
               "template": "opinion"
            },
            {
               "title": "What do you feel is currently missing from JavaScript?",
               "id": "missing_from_js",
               "description": "Features you'd like to see in JavaScript one day.",
               "template": "longtext"
            }
         ]
      },
      {
         "title": "About You",
         "description": "Let's get to know the real you.",
         "slug": "user_info",
         "questions": [
            {
               "title": "Years of Experience",
               "id": "years_of_experience",
               "description": "How long you've been writing JavaScript.",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": false,
               "randomize": false,
               "options": [
                  "Less than one year",
                  "1-2 years",
                  "2-5 years",
                  "5-10 years",
                  "10-20 years",
                  "20+ years"
               ]
            },
            {
               "title": "Job Title",
               "id": "job_title",
               "description": "How do you introduce yourself at parties?",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": true,
               "randomize": false,
               "options": [
                  "Front-end Developer/Engineer",
                  "Full-stack Developer/Engineer",
                  "Back-end Developer/Engineer",
                  "Web Developer"
               ]
            },
            {
               "title": "Other Job Title",
               "id": "job_title_other",
               "template": "text",
               "description": "Other job title you use not mentioned in the list above"
            },
            {
               "title": "CSS Proficiency",
               "id": "css_proficiency",
               "description": "How proficient are you at writing CSS? (pick the most advanced option corresponding to your skills)",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": false,
               "randomize": false,
               "options": [
                  "Level 1: virtually no knowledge of CSS",
                  "Level 2: using CSS frameworks and tweaking existing styles",
                  "Level 3: knowing specificity rules, being able to create layouts",
                  "Level 4: mastering animations, interactions, transitions, etc.",
                  "Level 5: being able to style an entire front-end from scratch following a consistent methodology"
               ]
            },
            {
               "title": "Back-end Proficiency",
               "id": "backend_proficiency",
               "description": "How proficient are you at back-end development? (pick the most advanced option corresponding to your skills)",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": false,
               "randomize": false,
               "options": [
                  "Level 1: not able to handle any back-end work",
                  "Level 2: able to set up all-in-one CMSs (WordPress, etc.) or static site generators (Jekyll, etc.)",
                  "Level 3: able to develop apps using pre-existing frameworks (Rails, Laravel, etc.)",
                  "Level 4: setting up an entire back-end from scratch (Go, Node, etc.)",
                  "Level 5: able to handle complex multi-server or microservices architectures"
               ]
            },
            {
               "title": "Company Size",
               "id": "company_size",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": false,
               "randomize": false,
               "options": [
                  "Just me",
                  "1-5 people",
                  "5-10 people",
                  "10-20 people",
                  "20-50 people",
                  "50-100 people",
                  "100-1000 people",
                  "1000+ people"
               ]
            },
            {
               "title": "Yearly Salary",
               "id": "yearly_salary",
               "description": "In USD",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": false,
               "randomize": false,
               "options": [
                  "I work for free :(",
                  "$0-$10k",
                  "$10k-$30k",
                  "$30k-$50k",
                  "$50k-$100k",
                  "$100k-$200k",
                  "$200k+"
               ]
            },
            {
               "title": "How did you find out about this survey?",
               "id": "how_did_you_find_out",
               "template": "text"
            },
            {
               "title": "Your Gender",
               "id": "gender",
               "template": "multiple",
               "allowmultiple": false,
               "allowother": true,
               "options": [
                  "Female",
                  "Male",
                  "Non-binary/ third gender",
                  "Prefer not to say"
               ]
            },
            {
               "title": "Other Gender",
               "id": "gender_other",
               "template": "text",
               "description": "Other gender not mentioned in the list above"
            },
            {
               "title": "Your Country",
               "id": "country",
               "template": "country",
               "description": "Your country of residence"
            },
            {
               "title": "Your Email",
               "id": "email",
               "description": "If you'd like to be notified when survey results are available. Your email won't be used for any other purpose.",
               "template": "email",
               "isprivate": true,
               "searchable": true
            }
         ]
      }
   ]
}