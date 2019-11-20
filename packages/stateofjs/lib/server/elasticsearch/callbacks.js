export const updateElasticSearchOnCreate = ({ document, currentUser }) => {
  console.log(
    `// New response ${document._id} by ${currentUser.displayName}! Updating elastic search…`
  );
};

export const updateElasticSearchOnUpdate = ({ document, currentUser }) => {
  console.log(
    `// Updated response ${document._id} by ${currentUser.displayName}! Updating elastic search…`
  );
};
