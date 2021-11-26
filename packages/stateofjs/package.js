Package.describe({
  name: 'stateofjs',
});

Package.onUse(function (api) {
  const version = '1.16.6';

  api.use([
    // Here are our dependencies:

    'fourseven:scss',

    // vulcan core
    'promise',
    `vulcan:core@${version}`,
    `vulcan:debug@${version}`,

    // vulcan packages
    `vulcan:forms@${version}`,
    `vulcan:accounts@${version}`,
    `vulcan:ui-bootstrap@${version}`,
    //`vulcan:newsletter@${version}`,

    `vulcan:events-internal@${version}`,

    `vulcan:errors-sentry@${version}`,
  ]);

  api.addFiles('lib/stylesheets/main.scss');

  // Here is the entry point for client & server:
  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');
});
