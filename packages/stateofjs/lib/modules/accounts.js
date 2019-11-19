/*

Vulcan Accounts config

*/
import { Accounts } from 'meteor/vulcan:accounts'

Accounts.ui.config({
  passwordSignupFields: 'EMAIL_ONLY',
});