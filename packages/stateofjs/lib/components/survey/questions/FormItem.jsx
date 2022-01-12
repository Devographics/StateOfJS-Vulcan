/*

Layout for a single form item

*/

import React from 'react';
import Form from 'react-bootstrap/Form';
import { mergeWithComponents } from 'meteor/vulcan:core';
import FormDescription from './FormDescription';
import FormNote from './FormNote';
import { intlShape } from 'meteor/vulcan:i18n';

const FormItem = (props, { intl }) => {
  const {
    path,
    children,
    beforeInput,
    afterInput,
    description,
    loading,
    intlKeys,
    Components: propsComponents,
  } = props;

  const Components = mergeWithComponents(propsComponents);

  const innerComponent = loading ? (
    <Components.FormInputLoading loading={loading}>{children}</Components.FormInputLoading>
  ) : (
    children
  );

  const note = intl.formatMessage({ id: `${intlKeys[0]}.note` });

  return (
    <Form.Group controlId={path}>
      <Components.FormLabel {...props} />
      <div className="form-item-contents">
        {description && <FormDescription {...props} />}
        <div className="form-item-input">
          {beforeInput}
          {innerComponent}
          {afterInput}
        </div>
        {note && <FormNote note={note} />}
      </div>
    </Form.Group>
  );
};

FormItem.contextTypes = {
  intl: intlShape,
};

export default FormItem;
