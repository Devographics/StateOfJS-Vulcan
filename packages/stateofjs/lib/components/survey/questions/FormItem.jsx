/*

Layout for a single form item

*/

import React from 'react';
import Form from 'react-bootstrap/Form';
import { mergeWithComponents } from 'meteor/vulcan:core';

const FormItem = (props) => {
  const {
    path,
    children,
    beforeInput,
    afterInput,
    description,
    loading,
    Components: propsComponents,
  } = props;

  const Components = mergeWithComponents(propsComponents);

  const innerComponent = loading ? (
    <Components.FormInputLoading loading={loading}>{children}</Components.FormInputLoading>
  ) : (
    children
  );

  return (
    <Form.Group controlId={path}>
      <Components.FormLabel {...props} />
      <div className="form-item-contents">
        {description && <Components.FormDescription {...props} />}
        <div className="form-item-input">
          {beforeInput}
          {innerComponent}
          {afterInput}
        </div>
      </div>
    </Form.Group>
  );
};

export default FormItem;
