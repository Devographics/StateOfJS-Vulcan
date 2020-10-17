import { getSetting } from 'meteor/vulcan:core';
import moment from 'moment';

const schema = {
  // default properties

  _id: {
    type: String,
    optional: true,
    canRead: ['guests'],
  },
  createdAt: {
    type: Date,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return new Date();
    },
  },
  startedAt: {
    type: Date,
    optional: true,
    canCreate: ['members'],
    canRead: ['admins'],
  },
  finishedAt: {
    type: Date,
    optional: true,
    canCreate: ['members'],
    canRead: ['admins'],
  },
  host: {
    type: String,
    optional: true,
    canRead: ['admins'],
    onCreate: () => {
      return getSetting('host');
    },
  },
  duration: {
    type: Number,
    optional: true,
    canRead: ['admins'],
    onCreate: ({ data }) => {
      return moment(data.finishedAt).diff(moment(data.startedAt));
    },
  },
  isError: {
    type: Boolean,
    optional: true,
    canCreate: ['members'],
    canRead: ['admins'],
  },
  responseId: {
    type: String,
    optional: true,
    canCreate: ['members'],
    canRead: ['admins'],
  },
};

export default schema;
