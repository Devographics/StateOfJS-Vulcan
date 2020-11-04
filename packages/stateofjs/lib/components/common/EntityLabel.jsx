import React from 'react';
import EntitiesContext from './EntitiesContext';

const EntityLabel = ({ id, label, fallback }) => {
  return (
    <EntitiesContext.Consumer>
      {({ entities }) => {
        const entity = entities && entities.find((e) => e.id === id);
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

export default EntityLabel;
