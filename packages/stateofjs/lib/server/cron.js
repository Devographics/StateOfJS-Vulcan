import moment from 'moment';
import { CronJob } from 'cron';
import { getSetting } from 'meteor/vulcan:core';
import { normalizeJob } from './normalization/cronjob';
import { exportEmailsJob } from './users/cronjob';
import { getEntitiesData } from './startup';

const runCrons = getSetting('runCrons', false);

const allCrons = async () => {
  if (runCrons) {
    // eslint-disable-next-line no-console
    console.log(
      `[Running cron jobs at ${moment().format('YYYY/MM/DD, hh:mm')}]`
    );
    const { entities, rules } = await getEntitiesData();
    await normalizeJob({ entities, rules });
    await exportEmailsJob();
  }
};

new CronJob(
  // '0 * * * *', // run every hour
  '*/5 * * * *', // run every N min
  Meteor.bindEnvironment(function () {
    allCrons();
  }),
  null,
  true,
  'Asia/Tokyo'
);
