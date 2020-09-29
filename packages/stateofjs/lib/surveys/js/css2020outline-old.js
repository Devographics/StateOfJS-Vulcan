export default {
  "slug": "css2020",
  "name": "State of CSS",
  "year": 2020,
  "status": 1,
  "imageUrl": "stateofcss2020.png",
  "outline": [
     {
        "title": "Layout",
        "description": "How do you position elements on the screen?",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "CSS Grid",
              "id": "grid"
           },
           {
              "title": "CSS Subgrid",
              "id": "subgrid"
           },
           {
              "title": "CSS Regions",
              "id": "regions"
           },
           {
              "title": "Flexbox",
              "id": "flexbox"
           },
           {
              "title": "CSS Multi-Column",
              "id": "multi_column"
           },
           {
              "title": "CSS Writing Modes",
              "id": "writing_modes"
           },
           {
              "title": "CSS Exclusions",
              "id": "exclusions"
           },
           {
              "title": "Position: sticky",
              "id": "position_sticky"
           },
           {
              "title": "Logical Properties",
              "id": "logical_properties",
              "description": "margin-block-start, padding-inline-end, etc."
           }
        ]
     },
     {
        "title": "Shapes & Graphics",
        "description": "Controlling the shape and display of elements.",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "CSS Shapes",
              "id": "shapes"
           },
           {
              "title": "Object-fit",
              "id": "object_fit"
           },
           {
              "title": "Clip-path",
              "id": "clip_path"
           },
           {
              "title": "CSS Masks",
              "id": "masks"
           },
           {
              "title": "Blend Modes",
              "id": "blend_modes"
           },
           {
              "title": "CSS Filter Effects",
              "id": "filter_effects"
           }
        ]
     },
     {
        "title": "Interactions",
        "description": "Controlling how the user interacts with the page.",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "CSS Scroll Snap",
              "id": "scroll_snap"
           },
           {
              "title": "Overscroll-behavior",
              "id": "overscroll_behavior"
           },
           {
              "title": "Overflow-anchor",
              "id": "overflow_anchor"
           }
        ]
     },
     {
        "title": "Typography",
        "description": "Setting and laying out text.",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "Web fonts (@font-face)",
              "id": "web_fonts"
           },
           {
              "title": "Variable fonts",
              "id": "variables_fonts"
           },
           {
              "title": "Line breaking properties (overflow-wrap, word-break, line-break, hyphens)",
              "id": "line_breaking"
           },
           {
              "title": "Font-variant-*",
              "id": "font_variant"
           },
           {
              "title": "Initial-letter",
              "id": "initial_letter"
           },
           {
              "title": "font-variant-numeric",
              "id": "font_variant_numeric"
           }
        ]
     },
     {
        "title": "Animations & Transforms",
        "description": "Animating and transforming elements.",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "CSS Transitions",
              "id": "transitions"
           },
           {
              "title": "CSS Transforms",
              "id": "transforms"
           },
           {
              "title": "CSS Animations",
              "id": "animations"
           }
        ]
     },
     {
        "title": "Other Features",
        "description": "Other CSS features.",
        "template": "feature",
        "slug": "features",
        "questions": [
           {
              "title": "CSS Variables",
              "id": "variables"
           },
           {
              "title": "Feature Support Queries (@supports)",
              "id": "feature_support_queries"
           },
           {
              "title": "CSS Containment",
              "id": "containment"
           },
           {
              "title": "Will-change",
              "id": "will_change"
           },
           {
              "title": "calc()",
              "id": "calc"
           },
           {
              "title": "Houdini",
              "id": "houdini"
           }
        ]
     },
     {
        "title": "Units & Selectors",
        "description": "Test your knowledge of CSS units and selectors.",
        "slug": "features",
        "questions": [
           {
              "title": "Units",
              "id": "units",
              "description": "Which of these CSS units have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 "px",
                 "pt",
                 "%",
                 "em",
                 "rem",
                 "vh, vw",
                 "vmin, vmax",
                 "ch",
                 "ex",
                 "mm",
                 "cm",
                 "in"
              ]
           },
           {
              "title": "Pseudo Elements",
              "id": "pseudo_elements",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 "::before",
                 "::after",
                 "::first-line",
                 "::first-letter",
                 "::selection",
                 "::placeholder"
              ]
           },
           {
              "title": "Combinators",
              "id": "combinators",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 "div span (descendant)",
                 "div > span (child)",
                 "div + div (next sibling)",
                 "div ~ div (subsequent sibling)"
              ]
           },
           {
              "title": "Tree / Document Structure",
              "id": "tree_document_structure",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 ":root",
                 ":empty",
                 ":not()",
                 ":nth-child()",
                 ":nth-last-child()",
                 ":first-child",
                 ":last-child",
                 ":only-child",
                 ":nth-of-type()",
                 ":nth-last-of-type()",
                 ":first-of-type",
                 ":last-of-type",
                 ":only-of-type",
                 ":lang()"
              ]
           },
           {
              "title": "Attributes",
              "id": "attributes",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 "div[foo] (Presence)",
                 "div[foo=\"bar\"] (Equality)",
                 "div[foo^=\"bar\"] (Starts with)",
                 "div[foo$=\"bar\"] (Ends with)",
                 "div[foo~=\"bar\"] (Contains word)",
                 "div[foo*=\"bar\"] (Contains substring)"
              ]
           },
           {
              "title": "Links/URLs",
              "id": "links_urls",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 ":any-link",
                 ":link and :visited",
                 ":local-link",
                 ":target"
              ]
           },
           {
              "title": "Interaction",
              "id": "interaction",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 ":hover",
                 ":active",
                 ":focus",
                 ":focus-within",
                 ":focus-visible"
              ]
           },
           {
              "title": "Form controls",
              "id": "form_controls",
              "description": "Which of these CSS selectors have you used?",
              "template": "multiple",
              "allowmultiple": true,
              "allowother": false,
              "randomize": false,
              "suffix": "choices",
              "options": [
                 ":enabled and :disabled",
                 ":read-only and :read-write",
                 ":placeholder-shown",
                 ":default",
                 ":checked",
                 ":indeterminate",
                 ":valid and :invalid",
                 ":user-invalid",
                 ":in-range and :out-of-range",
                 ":required and :optional"
              ]
           }
        ]
     },
     {
        "title": "Pre-/Post-processors",
        "description": "Utilities that augment CSS.",
        "template": "tool",
        "slug": "tools",
        "id": "pre_post_processors",
        "questions": [
           "Sass",
           "Less",
           "PostCSS",
           "Stylus",
           {
              "title": "Other Pre-/Post-processors",
              "id": "pre_post_processors",
              "description": "Other pre-/post-processors you use not mentioned in the list above",
              "template": "text",
              "sectionSlug": "sections_other_tools"
           },
           {
              "title": "Overall Happiness",
              "id": "pre_post_processors",
              "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of pre-/post-processors",
              "template": "happiness",
              "sectionSlug": "happiness"
           }
        ]
     },
     {
        "title": "CSS Frameworks",
        "description": "Libraries that give you pre-made components and styles.",
        "template": "tool",
        "slug": "tools",
        "id": "css_frameworks",
        "questions": [
           "Bootstrap",
           "Materialize CSS",
           "Ant Design",
           "Semantic UI",
           "Bulma",
           "Foundation",
           "UIKit",
           "Tachyons",
           "Primer",
           "Tailwind",
           "PureCSS",
           {
              "title": "Other CSS Frameworks",
              "id": "css_frameworks",
              "description": "Other CSS frameworks you use not mentioned in the list above",
              "template": "text",
              "sectionSlug": "sections_other_tools"
           },
           {
              "title": "Overall Happiness",
              "id": "css_frameworks",
              "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of CSS frameworks?",
              "template": "happiness",
              "sectionSlug": "happiness"
           }
        ]
     },
     {
        "title": "Methodologies",
        "description": "Codified ways to write cleaner CSS.",
        "template": "tool",
        "slug": "tools",
        "id": "css_methodologies",
        "questions": [
           "BEM",
           "Atomic CSS",
           "OOCSS",
           "SMACSS",
           "IT CSS",
           {
              "title": "Other Methodologies",
              "id": "css_methodologies",
              "description": "Other methodologies you use not mentioned in the list above",
              "template": "text",
              "sectionSlug": "sections_other_tools"
           },
           {
              "title": "Overall Happiness",
              "id": "css_methodologies",
              "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of CSS methodologies?",
              "template": "happiness",
              "sectionSlug": "happiness"
           }
        ]
     },
     {
        "title": "CSS-in-JS",
        "description": "Libraries that give you pre-made components and styles.",
        "template": "tool",
        "slug": "tools",
        "id": "css_in_js",
        "questions": [
           "Styled Components",
           "Glamor",
           "Aphrodite",
           "JSS",
           "Styled-JSX",
           "Radium",
           "Emotion",
           "CSS Modules",
           {
              "title": "Other CSS-in-JS Libraries",
              "id": "css_in_js",
              "description": "Other CSS-in-JS libraries you use not mentioned in the list above",
              "template": "text",
              "sectionSlug": "sections_other_tools"
           },
           {
              "title": "Overall Happiness",
              "id": "css_in_js",
              "description": "On a scale of one (very unhappy) to five (very happy), how happy you with the current overall state of CSS-in-JS libraries?",
              "template": "happiness",
              "sectionSlug": "happiness"
           }
        ]
     },
     {
        "title": "Other Tools",
        "slug": "other_tools",
        "description": "For these tools & technologies, just check the ones that you use regularly.",
        "questions": [
           {
              "title": "Text Editors",
              "id": "text_editors",
              "description": "Which text editor(s) do you regularly use?",
              "template": "multiple",
              "allowmultiple": true,
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
              "options": [
                 "Edge",
                 "Chrome",
                 "Safari",
                 "Firefox",
                 "Internet Explorer 11",
                 "Internet Explorer 8/9/10",
                 "Opera Mini",
                 "Safari iOS",
                 "Chrome iOS",
                 "Chrome Android",
                 "Firefox Android",
                 "Samsung Internet",
                 "Vivaldi",
                 "Brave",
                 "UC Browser",
                 "Opera",
                 "Polypane"
              ]
           },
           {
              "title": "Other Browsers",
              "id": "browsers",
              "suffix": "others",
              "template": "text",
              "description": "Other browsers you use not mentioned in the list above"
           }
        ]
     },
     {
        "title": "Environments",
        "description": "Which environments do you write CSS for?",
        "slug": "environments",
        "questions": [
           {
              "title": "Browsers",
              "id": "browsers",
              "description": "Which browsers do you test in?",
              "template": "multiple",
              "options": [
                 "Edge",
                 "Chrome",
                 "Safari",
                 "Firefox",
                 "Internet Explorer 11",
                 "Internet Explorer 8/9/10",
                 "Opera Mini",
                 "Safari iOS",
                 "Chrome iOS",
                 "Chrome Android",
                 "Firefox Android",
                 "Samsung Internet",
                 "Vivaldi",
                 "Brave",
                 "UC Browser",
                 "Opera",
                 "Polypane"
              ]
           },
           {
              "title": "Form Factors",
              "id": "form_factors",
              "description": "Which form factors do you test on?",
              "template": "multiple",
              "options": [
                 "Desktop",
                 "Smartphone",
                 "Feature Phone",
                 "Tablet",
                 "Smart Watch",
                 "TV",
                 "Gaming Console",
                 "Screen Reader",
                 "Print"
              ]
           },
           {
              "title": "CSS for Print",
              "id": "css_for_print",
              "description": "Do you write print styles?",
              "template": "single",
              "options": [
                 {
                    "label": "I (almost) never write print styles",
                    "value": 0
                 },
                 {
                    "label": "I occasionally write print styles",
                    "value": 1
                 },
                 {
                    "label": "I write print styles as part of most projects",
                    "value": 2
                 },
                 {
                    "label": "I focus mainly on CSS for print",
                    "value": 3
                 }
              ]
           },
           {
              "title": "CSS for Email Clients",
              "id": "css_for_email",
              "description": "Do you write CSS for email clients?",
              "template": "single",
              "allowmultiple": false,
              "allowother": false,
              "randomize": false,
              "options": [
                 {
                    "label": "I (almost) never write CSS for email clients",
                    "value": 0
                 },
                 {
                    "label": "I occasionally write CSS for email clients",
                    "value": 1
                 },
                 {
                    "label": "I write CSS for email clients as part of most projects",
                    "value": 2
                 },
                 {
                    "label": "I focus mainly on CSS for email clients",
                    "value": 3
                 }
              ]
           }
        ]
     },
     {
        "title": "Resources",
        "description": "What CSS resources do you consult?",
        "slug": "resources",
        "questions": [
           {
              "title": "Blogs, News, & Magazines",
              "id": "blogs_news_magazines",
              "description": "Which CSS-related blogs/magazines/etc. do you read?",
              "template": "multiple",
              "options": [
                 "CSS Tricks",
                 "Smashing Magazine",
                 "CoDrops",
                 "SitePoint",
                 "David Walsh",
                 "Front-End Front",
                 "CSS Weekly",
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
              "description": "Which CSS-related sites/courses/etc. do you consult?",
              "template": "multiple",
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
              "description": "Which CSS or programming-related podcasts do you listen to?",
              "template": "multiple",
              "options": [
                 "Shop Talk Show",
                 "Style Guide Podcast",
                 "The Big Web Show",
                 "The Web Ahead",
                 "Non Breaking Space Show",
                 "The Changelog",
                 "Syntax"
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
        "description": "How do you feel about the state of CSS?",
        "slug": "opinions",
        "questions": [
           {
              "title": "CSS is easy to learn",
              "id": "css_easy_to_learn",
              "template": "opinion"
           },
           {
              "title": "CSS is evolving too slowly",
              "id": "css_evolving_slowly",
              "template": "opinion"
           },
           {
              "title": "Utility (non-semantic) classes (.center, .large-text, etc.) should be avoided",
              "id": "utility_classes_to_be_avoided",
              "template": "opinion"
           },
           {
              "title": "Selector nesting (.foo .bar ul li {...}) should be avoided",
              "id": "selector_nesting_to_be_avoided",
              "template": "opinion"
           },
           {
              "title": "CSS is a programming language",
              "id": "css_is_programming_language",
              "template": "opinion"
           },
           {
              "title": "I enjoy writing CSS",
              "id": "enjoy_writing_css",
              "template": "opinion"
           },
           {
              "title": "What do you feel is currently missing from CSS?",
              "id": "currently_missing_from_css",
              "description": "Features you'd like to see in CSS one day.",
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
              "description": "How long you've been writing CSS.",
              "template": "single",
              "options": [
                 {
                    "label": "Less than one year",
                    "value": "range_less_than_1"
                 },
                 {
                    "label": "1-2 years",
                    "value": "range_1_2"
                 },
                 {
                    "label": "2-5 years",
                    "value": "range_2_5"
                 },
                 {
                    "label": "5-10 years",
                    "value": "range_5_10"
                 },
                 {
                    "label": "10-20 years",
                    "value": "range_10_20"
                 },
                 {
                    "label": "20+ years",
                    "value": "range_more_than_20"
                 }
              ]
           },
           {
              "title": "Job Title",
              "id": "job_title",
              "description": "How do you introduce yourself at parties?",
              "template": "single",
              "allowother": true,
              "options": [
                 {
                    "label": "Front-end Developer/Engineer",
                    "value": "front_end_developer"
                 },
                 {
                    "label": "Full-stack Developer/Engineer",
                    "value": "full_stack_developer"
                 },
                 {
                    "label": "Back-end Developer/Engineer",
                    "value": "back_end_developer"
                 },
                 {
                    "label": "Web Developer",
                    "value": "web_developer"
                 },
                 {
                    "label": "Web Designer",
                    "value": "web_designer"
                 },
                 {
                    "label": "UI Designer",
                    "value": "ui_designer"
                 },
                 {
                    "label": "UX Designer",
                    "value": "ux_designer"
                 }
              ]
           },
           {
              "title": "JavaScript Proficiency",
              "id": "javascript_proficiency",
              "description": "How proficient are you at JavaScript development? (pick the most advanced option corresponding to your skills)",
              "template": "single",
              "options": [
                 {
                    "label": "I am not able to write any JavaScript",
                    "value": 0
                 },
                 {
                    "label": "I can write short, simple JavaScript or jQuery statements",
                    "value": 1
                 },
                 {
                    "label": "I can work on existing front-end codebases using modern frameworks (React, Vue, etc.)",
                    "value": 2
                 },
                 {
                    "label": "I can architecture entire front-end codebases from scratch",
                    "value": 3
                 },
                 {
                    "label": "I can handle advanced front-end patterns (state management, data loading, etc.)",
                    "value": 4
                 }
              ]
           },
           {
              "title": "Back-end Proficiency",
              "id": "backend_proficiency",
              "description": "How proficient are you at back-end development? (pick the most advanced option corresponding to your skills)",
              "template": "single",
              "options": [
                 {
                    "label": "I am not able to handle any back-end work",
                    "value": 0
                 },
                 {
                    "label": "I can set up all-in-one CMSs (WordPress, etc.) or static site generators (Jekyll, etc.)",
                    "value": 1
                 },
                 {
                    "label": "I can develop apps using pre-existing frameworks (Rails, Laravel, etc.)",
                    "value": 2
                 },
                 {
                    "label": "I can set up an entire back-end from scratch (Go, Node, etc.)",
                    "value": 3
                 }
              ]
           },
           {
              "title": "Company Size",
              "id": "company_size",
              "template": "single",
              "options": [
                 {
                    "label": "Just me",
                    "value": "range_1"
                 },
                 {
                    "label": "1-5 people",
                    "value": "range_1_5"
                 },
                 {
                    "label": "5-10 people",
                    "value": "range_5_10"
                 },
                 {
                    "label": "10-20 people",
                    "value": "range_10_20"
                 },
                 {
                    "label": "20-50 people",
                    "value": "range_20_50"
                 },
                 {
                    "label": "50-100 people",
                    "value": "range_50_100"
                 },
                 {
                    "label": "100-1000 people",
                    "value": "range_100_1000"
                 },
                 {
                    "label": "1000+ people",
                    "value": "range_more_than_1000"
                 }
              ]
           },
           {
              "title": "Yearly Salary",
              "id": "yearly_salary",
              "description": "In USD",
              "template": "single",
              "options": [
                 {
                    "label": "I work for free :(",
                    "value": "range_work_for_free"
                 },
                 {
                    "label": "$0-$10k",
                    "value": "range_0_10"
                 },
                 {
                    "label": "$10k-$30k",
                    "value": "range_10_30"
                 },
                 {
                    "label": "$30k-$50k",
                    "value": "range_30_50"
                 },
                 {
                    "label": "$50k-$100k",
                    "value": "range_50_100"
                 },
                 {
                    "label": "$100k-$200k",
                    "value": "range_100_200"
                 },
                 {
                    "label": "$200k+",
                    "value": "range_more_than_200"
                 }
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
              "template": "single",
              "allowother": true,
              "options": [
                 {
                    "label": "Female",
                    "value": "female"
                 },
                 {
                    "label": "Male",
                    "value": "male"
                 },
                 {
                    "label": "Non-binary/ third gender",
                    "value": "non_binary"
                 },
                 {
                    "label": "Prefer not to say",
                    "value": "prefer_not_to_say"
                 }
              ]
           },
           {
              "title": "Your Email",
              "id": "email",
              "description": "If you'd like to be notified when survey results are available. Your email won't be used for any other purpose.",
              "template": "email"
           },
           {
              "title": "Your Country",
              "id": "country",
              "template": "country"
           }
        ]
     }
  ]
}