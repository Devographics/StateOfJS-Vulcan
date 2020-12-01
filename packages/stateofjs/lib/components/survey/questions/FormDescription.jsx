import React from 'react';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';

const FormDescription = ({ description }) => {
  return (
    <Form.Text>
      <ReactMarkdown source={description} escapeHtml={false} />
    </Form.Text>
  );
};

export default FormDescription