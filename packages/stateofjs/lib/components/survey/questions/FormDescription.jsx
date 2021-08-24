import React from 'react';
import Form from 'react-bootstrap/Form';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

const FormDescription = ({ description }) => {
  return (
    <Form.Text>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{description}</ReactMarkdown>
    </Form.Text>
  );
};

export default FormDescription