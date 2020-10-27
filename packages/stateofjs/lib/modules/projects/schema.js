const schema = {
  _id: {
    type: String,
    canRead: ['guests'],
  },
  id: {
    type: String,
    canRead: ['guests'],
  },
  name: {
    type: String,
    canRead: ['guests'],
  },
  npm: {
    type: String,
    canRead: ['guests'],
  },
  github: {
    type: String,
    canRead: ['guests'],
  },
  description: {
    type: String,
    canRead: ['guests'],
  },
  homepage: {
    type: String,
    canRead: ['guests'],
  },
};

export default schema;
