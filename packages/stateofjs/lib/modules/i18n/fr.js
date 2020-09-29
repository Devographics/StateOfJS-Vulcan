import { registerLocale, addStrings } from 'meteor/vulcan:core';

registerLocale({
  id: 'fr',
  label: 'Français',
  // domains: ['http://localhost:4000', 'http://ja.zenshome.jp'],
  required: false,
});


addStrings('fr', {
  'accounts.switch_to_sign_in': 'Already have an account? Sign in →',
  'accounts.switch_to_sign_up': `Don't have an account? Sign up →`,

  'forms.confirm_discard': 'You have unsaved data! Please choose "Cancel", then save by using the previous/next buttons at the bottom of the page.',

  'share.email': 'Share via email',
  'share.twitter': 'Share via Twitter',
  'share.facebook': 'Share via Facebook',
  'share.linkedin': 'Share via LinkedIn',


  // About You (User Info)
  'salary.range_work_for_free.long': 'Je travaille gratuitement',

});
