import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {Components} from 'meteor/vulcan:core';

const Help = ({ intlKeys }) => {
  return (
    <div className="form-help">
      <Components.FormattedMessage id={intlKeys[0]} md={true}/>
      <ReactMarkdown rehypePlugins={[rehypeRaw]}><Components.FormattedMessage id={intlKeys[0]} md={true}/></ReactMarkdown>
    </div>
  );
};


export default Help
