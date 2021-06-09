# State Of JS Survey App

Built with Vulcan.js

## Sample `settings.json`

- You can remove the `XXX` part of each key if you want to use that particular service.
- If you're running a local copy of the State of JS API the local URL will typically be something like `http://localhost:3000/graphql`.

```json
{
  "public": {

    "debug": false,

    "title": "The 2020 State of JavaScript Survey",
    "tagline":"Take the State of JavaScript survey",
    "siteImage": "https://survey.stateofjs.com/stateofjs-social.png",

    "environment": "development",
    
    "faviconUrl": "/favicon.png",

    "defaultLocaleId": "en-US",
    "locale": "en-US",

    "host": "lh",
    "hosting": "Localhost",
    "hostingLink": "http://localhost:5000/",
    
    "sentryXXX": {
      "clientDSN": "foobar"
    }
  },

  "defaultEmail": "hello@stateofjs.com",
  "mailUrlXXX": "smtp://foo:foobar@smtp.mailgun.org:587/",

  "sentryXXX": {
    "serverDSN": "foobar"
  },

  "translationAPI": "http://api.stateofjs.com/graphql",

  "apiKeyXXX": "foobar",
  
  "encriptionKeyXXX": "foobar",

  "disableAPICache": true
}
```