import React from 'react';

const FormLayout = ({ FormComponents, commonProps, formProps, errorProps, repeatErrors, submitProps, children }) => (
  <FormComponents.FormElement {...formProps}>
    {/* <FormComponents.FormSubmit {...submitProps} showMessage={false} variant="top"/> */}

    <FormComponents.FormErrors {...commonProps} {...errorProps} />

    {children}

    {repeatErrors && <FormComponents.FormErrors {...commonProps} {...errorProps} />}

    <FormComponents.FormSubmit {...commonProps} {...submitProps} variant="bottom" />
  </FormComponents.FormElement>
);

export default FormLayout;
