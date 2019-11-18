Package.describe({
  name: 'stateofjs',
});

Package.onUse(function (api) {

  api.use([

    // Here are our dependencies:

    'fourseven:scss@4.12.0',

    // vulcan core
    'promise',
    'vulcan:core@=1.14.0',

    // vulcan packages
    'vulcan:forms@=1.14.0',
    'vulcan:accounts@=1.14.0',
    'vulcan:ui-bootstrap@=1.14.0',

  ]);

  api.addFiles('lib/stylesheets/main.scss');

  // Here is the entry point for client & server:
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
