import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { intlShape } from 'meteor/vulcan:i18n';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Accordion from 'react-bootstrap/Accordion';

const items = ['create_account', 'anonymous_survey', 'questions_required', 'data_published', 'survey_design', 'results_released', 'team'];

const Faq = () => (
  <div className="faq survey-page-block">
    <h3 className="faq-heading survey-page-block-heading">
      <Components.FormattedMessage id="general.faq" />
    </h3>
    <Accordion flush className="faq-contents">
      {items.map((item, index) => (
        <FaqItem item={item} index={index} key={item} />
      ))}
    </Accordion>
  </div>
);

const FaqItem = ({ item, index }, { intl }) => {
  return (
    <Accordion.Item as="dl" eventKey={index} className="faq-item">
      <Accordion.Header as="dt" className="faq-item-heading">
        <Components.FormattedMessage id={`faq.${item}`} />
      </Accordion.Header>
      <Accordion.Body as="dd" className="faq-item-body">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {intl.formatMessage({ id: `faq.${item}.description` })}
        </ReactMarkdown>
        {/* <Components.FormattedMessage id={`faq.${item}.description`} md={true} /> */}
      </Accordion.Body>
    </Accordion.Item>
  );
};

FaqItem.contextTypes = {
  intl: intlShape,
};

export default Faq;
