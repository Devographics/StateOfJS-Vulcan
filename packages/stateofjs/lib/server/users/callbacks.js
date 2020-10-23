/*

Note: do not do this automatically for now because we would end up
emailing reminders to people who already took the survey

Instead, export and add all emails manually after the survey.

*/

// import { subscribeEmail } from 'meteor/vulcan:newsletters';

// export const addEmailToEmailOctopus = async ({ document: user }) => {
//   console.log('// addEmailToEmailOctopus')
//   const result = await subscribeEmail(user.email);
//   console.log(result)
// }