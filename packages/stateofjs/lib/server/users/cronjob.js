import { subscribeEmail } from 'meteor/vulcan:newsletter';
import { PrivateResponses } from '../../modules/private_responses';

export const exportEmailsJob = async () => {
  const startAt = new Date();
  const privateResponses = PrivateResponses.find({
    emailExported: { $ne: true },
  }).fetch();
  if (privateResponses.length === 0) {
    // eslint-disable-next-line
    console.log('// Found 0 emails to export.');
    return;
  }

  // eslint-disable-next-line
  console.log(
    `// ✉️ Exporting ${privateResponses.length} emails at ${startAt}…`
  );
  for (const response of privateResponses) {
    const { _id, user_info = {} } = response;
    const { email } = user_info;
    if (email) {
      await subscribeEmail(email);
    }
    PrivateResponses.update({ _id }, { $set: { emailExported: true } });
  }
  const endAt = new Date();
  const diff = Math.abs(endAt - startAt);
  const duration = Math.ceil(diff / 1000);

  // eslint-disable-next-line
  console.log(
    `-> ✉️ Done exporting ${privateResponses.length} emails in ${duration}s`
  );
};
