import moment from 'moment';
import { CronJob } from 'cron';
import { getSetting } from 'meteor/vulcan:core';
import { normalizeJob } from './normalization/cronjob';

const runCrons = getSetting('runCrons', true);

const allCrons = async () => {
  if (runCrons) {
    // eslint-disable-next-line no-console
    console.log(`[Running cron jobs at ${moment().format('YYYY/MM/DD, hh:mm')}]`);
    await normalizeJob();
  }
};

new CronJob(
  // '0 * * * *', // run every hour
  '10 * * * *', // run every 10 min
  Meteor.bindEnvironment(function() {
    allCrons();
  }),
  null,
  true,
  'Asia/Tokyo'
);