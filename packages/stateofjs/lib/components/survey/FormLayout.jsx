import React from 'react';
import PropTypes from 'prop-types';
import { registerComponent } from 'meteor/vulcan:core';

const FormLayout = ({ FormComponents, formProps, errorProps, repeatErrors, submitProps, children }) => (
  <FormComponents.FormElement {...formProps}>
    <FormComponents.FormSubmit {...submitProps} showMessage={false} variant="top"/>

    <FormComponents.FormErrors {...errorProps} />

    {children}

    {repeatErrors && <FormComponents.FormErrors {...errorProps} />}

    <FormComponents.FormSubmit {...submitProps} variant="bottom" />
  </FormComponents.FormElement>
);

export default FormLayout;

registerComponent('FormLayout', FormLayout);
