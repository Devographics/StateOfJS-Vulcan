
/* Generated automatically, do not modify */
export default {
  "slug": "css2020",
  "name": "State of CSS",
  "year": 2020,
  "status": 1,
  "imageUrl": "stateofcss2020.png",
  "outline": [
    {
      "id": "layout",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "grid"
        },
        {
          "id": "subgrid"
        },
        {
          "id": "regions"
        },
        {
          "id": "flexbox"
        },
        {
          "id": "multi_column"
        },
        {
          "id": "writing_modes"
        },
        {
          "id": "exclusions"
        },
        {
          "id": "position_sticky"
        },
        {
          "id": "logical_properties"
        },
        {
          "id": "aspect_ratio"
        }
      ]
    },
    {
      "id": "shapes_graphics",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "shapes"
        },
        {
          "id": "object_fit"
        },
        {
          "id": "clip_path"
        },
        {
          "id": "masks"
        },
        {
          "id": "blend_modes"
        },
        {
          "id": "filter_effects"
        }
      ]
    },
    {
      "id": "interactions",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "scroll_snap"
        },
        {
          "id": "overscroll_behavior"
        },
        {
          "id": "overflow_anchor"
        }
      ]
    },
    {
      "id": "typography",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "web_fonts"
        },
        {
          "id": "variables_fonts"
        },
        {
          "id": "line_breaking"
        },
        {
          "id": "font_variant"
        },
        {
          "id": "initial_letter"
        },
        {
          "id": "font_variant_numeric"
        },
        {
          "id": "font_display"
        },
        {
          "id": "line_clamp"
        }
      ]
    },
    {
      "id": "animations_transforms",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "transitions"
        },
        {
          "id": "transforms"
        },
        {
          "id": "animations"
        }
      ]
    },
    {
      "id": "other_features",
      "template": "feature",
      "slug": "features",
      "questions": [
        {
          "id": "variables"
        },
        {
          "id": "feature_support_queries"
        },
        {
          "id": "containment"
        },
        {
          "id": "will_change"
        },
        {
          "id": "calc"
        },
        {
          "id": "houdini"
        },
        {
          "id": "comparison_functions"
        }
      ]
    },
    {
      "id": "units_selectors",
      "slug": "features",
      "questions": [
        {
          "id": "units",
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
          "id": "pseudo_elements",
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
            "::placeholder",
            "::marker"
          ]
        },
        {
          "id": "combinators",
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
          "id": "tree_document_structure",
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
          "id": "attributes",
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
          "id": "links_urls",
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
          "id": "interaction",
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
          "id": "form_controls",
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
      "id": "pre_post_processors",
      "template": "tool",
      "slug": "tools",
      "questions": [
        "Sass",
        "Less",
        "PostCSS",
        "Stylus",
        {
          "id": "pre_post_processors",
          "template": "text",
          "sectionSlug": "sections_other_tools"
        },
        {
          "id": "pre_post_processors",
          "template": "happiness",
          "sectionSlug": "happiness"
        }
      ]
    },
    {
      "id": "css_frameworks",
      "template": "tool",
      "slug": "tools",
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
        "Skeleton",
        "Spectre",
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
      "id": "css_methodologies",
      "template": "tool",
      "slug": "tools",
      "questions": [
        "BEM",
        "Atomic CSS",
        "OOCSS",
        "SMACSS",
        "IT CSS",
        "CUBE CSS",
        {
          "id": "css_methodologies",
          "template": "text",
          "sectionSlug": "sections_other_tools"
        },
        {
          "id": "css_methodologies",
          "template": "happiness",
          "sectionSlug": "happiness"
        }
      ]
    },
    {
      "id": "css_in_js",
      "template": "tool",
      "slug": "tools",
      "questions": [
        "Styled Components",
        "JSS",
        "Styled-JSX",
        "Radium",
        "Emotion",
        "CSS Modules",
        "Styled System",
        "Stitches",
        "Styletron",
        "Fela",
        "Linaria",
        {
          "id": "css_in_js",
          "template": "text",
          "sectionSlug": "sections_other_tools"
        },
        {
          "id": "css_in_js",
          "template": "happiness",
          "sectionSlug": "happiness"
        }
      ]
    },
    {
      "id": "other_tools",
      "slug": "other_tools",
      "questions": [
        {
          "id": "text_editors",
          "template": "multiple",
          "allowmultiple": true,
          "options": [
            "VS Code",
            "Sublime Text",
            "Atom",
            "Vim",
            "Emacs",
            "Webstorm",
            "Nova"
          ]
        },
        {
          "id": "text_editors",
          "suffix": "others",
          "template": "text"
        },
        {
          "id": "browsers",
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
          "id": "browsers",
          "suffix": "others",
          "template": "text"
        }
      ]
    },
    {
      "id": "environments",
      "slug": "environments",
      "questions": [
        {
          "id": "browsers",
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
          "id": "form_factors",
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
          "id": "css_for_print",
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
          "id": "css_for_email",
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
      "id": "resources",
      "slug": "resources",
      "questions": [
        {
          "id": "blogs_news_magazines",
          "template": "multiple",
          "options": [
            "CSS Tricks",
            "Smashing Magazine",
            "CoDrops",
            "SitePoint",
            "David Walsh",
            "Front-End Front",
            "CSS Weekly",
            "Dev.to"
          ]
        },
        {
          "id": "blogs_news_magazines",
          "template": "text",
          "suffix": "others"
        },
        {
          "id": "sites_courses",
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
          "id": "sites_courses",
          "template": "text",
          "suffix": "others"
        },
        {
          "id": "podcasts",
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
          "id": "podcasts",
          "template": "text",
          "suffix": "others"
        }
      ]
    },
    {
      "id": "opinions",
      "slug": "opinions",
      "questions": [
        {
          "id": "css_easy_to_learn",
          "template": "opinion"
        },
        {
          "id": "css_evolving_slowly",
          "template": "opinion"
        },
        {
          "id": "utility_classes_to_be_avoided",
          "template": "opinion"
        },
        {
          "id": "selector_nesting_to_be_avoided",
          "template": "opinion"
        },
        {
          "id": "css_is_programming_language",
          "template": "opinion"
        },
        {
          "id": "enjoy_writing_css",
          "template": "opinion"
        },
        {
          "id": "currently_missing_from_css",
          "template": "longtext"
        }
      ]
    },
    {
      "id": "user_info",
      "slug": "user_info",
      "questions": [
        {
          "id": "years_of_experience",
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
          "id": "yearly_salary",
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
          "id": "job_title",
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
          "id": "javascript_proficiency",
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
          "id": "backend_proficiency",
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
          "id": "how_did_you_find_out",
          "template": "text"
        },
        {
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
          "id": "email",
          "template": "email"
        },
        {
          "id": "country",
          "template": "country"
        }
      ]
    }
  ]
}
