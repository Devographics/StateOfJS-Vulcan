import React from 'react';
import EntitiesContext from './EntitiesContext';
import { FormattedMessage, intlShape } from 'meteor/vulcan:i18n';

const EntityLabel = ({ id, label, fallback }, { intl }) => {
  return (
    <EntitiesContext.Consumer>
      {({ entities }) => {
        const entity = entities.find((e) => e.id === id);
        // let intlString = '';
        // console.log('// EntityLabel');
        // console.log(id);
        // console.log(label);
        // console.log(fieldPath);
        // console.log(intlKeys);
        // if (intlKeys) {
        //   intlKeys.forEach((id) => {
        //     intlString = intl.formatMessage({ id, defaultMessage: '' });
        //   });
        // }
        // console.log(entity);
        // console.log(intlString);
        if (label) {
          // if label is provided, use that
          return <span className="entity-label entity-label-i18n" dangerouslySetInnerHTML={{ __html: label }} />;
        } else if (entity) {
          const { name, isCode } = entity;
          if (isCode) {
            return <code className="entity-label entity-label-code">{name}</code>;
          } else {
            return <span className="entity-label">{name}</span>;
          }
        } else {
          return <span className="entity-label entity-label-fallback">{fallback}</span>;
        }
      }}
    </EntitiesContext.Consumer>
  );
};

EntityLabel.contextTypes = {
  intl: intlShape,
};

export default EntityLabel;
