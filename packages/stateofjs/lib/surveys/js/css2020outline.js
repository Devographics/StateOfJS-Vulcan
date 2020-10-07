
/* Generated automatically, do not modify */
export default {
  "slug": "css2020",
  "namespace": "css",
  "topic": "CSS",
  "createdAt": "October 1, 2020",
  "prettySlug": "state-of-css",
  "hashtag": "StateOfCSS",
  "shareUrl": "https://stateofcss.com",
  "name": "State of CSS",
  "year": 2020,
  "status": 2,
  "imageUrl": "stateofcss2020.png",
  "bgColor": "#232840",
  "textColor": "#9ac6c9",
  "linkColor": "#f649a7",
  "hoverColor": "#59df7f",
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
          "intlId": "tools.other_tools",
          "template": "text",
          "sectionSlug": "sections_other_tools",
          "suffix": "others"
        },
        {
          "id": "pre_post_processors",
          "intlId": "tools.happiness",
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
          "id": "css_frameworks",
          "intlId": "tools.other_tools",
          "template": "text",
          "sectionSlug": "sections_other_tools",
          "suffix": "others"
        },
        {
          "id": "css_frameworks",
          "intlId": "tools.happiness",
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
          "intlId": "tools.other_tools",
          "template": "text",
          "sectionSlug": "sections_other_tools",
          "suffix": "others"
        },
        {
          "id": "css_methodologies",
          "intlId": "tools.happiness",
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
        "Astroturf",
        {
          "id": "css_in_js",
          "intlId": "tools.other_tools",
          "template": "text",
          "sectionSlug": "sections_other_tools",
          "suffix": "others"
        },
        {
          "id": "css_in_js",
          "intlId": "tools.happiness",
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
          "id": "utilities",
          "template": "multiple",
          "allowmultiple": true,
          "options": [
            "Stylelint",
            "PurgeCSS",
            "PurifyCSS"
          ]
        },
        {
          "id": "utilities",
          "suffix": "others",
          "template": "text"
        },
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
          "fieldType": "Number",
          "options": [
            {
              "id": 0
            },
            {
              "id": 1
            },
            {
              "id": 2
            },
            {
              "id": 3
            }
          ]
        },
        {
          "id": "css_for_email",
          "template": "single",
          "fieldType": "Number",
          "options": [
            {
              "id": 0
            },
            {
              "id": 1
            },
            {
              "id": 2
            },
            {
              "id": 3
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
            "Dev.to",
            "Sidebar",
            "HeyDesigner",
            "CSS Weekly"
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
          "suffix": "others",
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
              "id": "range_less_than_1"
            },
            {
              "id": "range_1_2"
            },
            {
              "id": "range_2_5"
            },
            {
              "id": "range_5_10"
            },
            {
              "id": "range_10_20"
            },
            {
              "id": "range_more_than_20"
            }
          ]
        },
        {
          "id": "company_size",
          "template": "single",
          "options": [
            {
              "id": "range_1"
            },
            {
              "id": "range_1_5"
            },
            {
              "id": "range_5_10"
            },
            {
              "id": "range_10_20"
            },
            {
              "id": "range_20_50"
            },
            {
              "id": "range_50_100"
            },
            {
              "id": "range_100_1000"
            },
            {
              "id": "range_more_than_1000"
            }
          ]
        },
        {
          "id": "yearly_salary",
          "template": "single",
          "options": [
            {
              "id": "range_work_for_free"
            },
            {
              "id": "range_0_10"
            },
            {
              "id": "range_10_30"
            },
            {
              "id": "range_30_50"
            },
            {
              "id": "range_50_100"
            },
            {
              "id": "range_100_200"
            },
            {
              "id": "range_more_than_200"
            }
          ]
        },
        {
          "id": "job_title",
          "template": "single",
          "allowother": true,
          "options": [
            {
              "id": "front_end_developer"
            },
            {
              "id": "full_stack_developer"
            },
            {
              "id": "back_end_developer"
            },
            {
              "id": "web_developer"
            },
            {
              "id": "web_designer"
            },
            {
              "id": "ui_designer"
            },
            {
              "id": "ux_designer"
            }
          ]
        },
        {
          "id": "css_proficiency",
          "template": "proficiency"
        },
        {
          "id": "javascript_proficiency",
          "template": "proficiency"
        },
        {
          "id": "backend_proficiency",
          "template": "proficiency"
        },
        {
          "id": "how_did_user_find_out_about_the_survey",
          "template": "text"
        },
        {
          "id": "gender",
          "template": "single",
          "allowother": true,
          "options": [
            {
              "id": "female"
            },
            {
              "id": "male"
            },
            {
              "id": "non_binary"
            },
            {
              "id": "prefer_not_to_say"
            }
          ]
        },
        {
          "id": "skin_tone",
          "template": "single",
          "fieldType": "Number",
          "options": [
            {
              "id": 0
            },
            {
              "id": 1
            },
            {
              "id": 2
            },
            {
              "id": 3
            },
            {
              "id": 4
            }
          ]
        },
        {
          "id": "country",
          "template": "country"
        }
      ]
    }
  ]
}
