import React from 'react';
import Form from 'react-bootstrap/Form';
import EntityLabel from '../../common/EntityLabel';

const FormLabel = ({ questionId, label, layout, path }) => {
  const labelProps = layout === 'horizontal' ? { column: true, sm: 3 } : {};
  const entityProps = {
    id: questionId,
    fallback: label,
  }

  // if label has been translated, use that to override entity name
  if (label.toLowerCase() !== path) {
    entityProps.label = label;
  }

  return (
    <Form.Label {...labelProps}>
      <EntityLabel {...entityProps}/>
    </Form.Label>
  );
};

export default FormLabel;