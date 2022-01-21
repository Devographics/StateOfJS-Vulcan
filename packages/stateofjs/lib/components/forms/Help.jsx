import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';

const Help = ({ intlKeys }, { intl }) => {
  return (
    <div className="form-help">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{intl.formatMessage({ id: intlKeys[0] })}</ReactMarkdown>
    </div>
  );
};

Help.contextTypes = {
  intl: intlShape,
};

export default Help;