import React from 'react';
import Form from 'react-bootstrap/Form';
import EntityLabel from '../../common/EntityLabel';
import { Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';

const FormLabel = ({ questionId, label, layout, path, year }, { intl }) => {
  const labelProps = layout === 'horizontal' ? { column: true, sm: 3 } : {};
  const entityProps = {
    id: questionId,
    fallback: label,
  };

  // if label has been translated, use that to override entity name
  if (label.toLowerCase() !== path) {
    entityProps.label = label;
  }

  return (
    <h3>
      <Form.Label {...labelProps}>
        <EntityLabel {...entityProps} />
        {year === 2021 && (
          <span className="question-label-new" title={intl.formatMessage({ id: 'general.newly_added' })}>
            {year}
          </span>
        )}
      </Form.Label>
    </h3>
  );
};

FormLabel.contextTypes = {
  intl: intlShape,
};

export default FormLabel;
