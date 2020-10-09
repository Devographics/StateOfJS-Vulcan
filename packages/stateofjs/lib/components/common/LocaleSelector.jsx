import React from 'react';
import PropTypes from 'prop-types';
import { Locales } from 'meteor/vulcan:core';
import { FormattedMessage } from 'meteor/vulcan:i18n';

const LocaleSelector = (props, { setLocale, getLocale }) => {
  return (
    <div className="locale-selector">
      <p className="locale-selector-languages">
        <FormattedMessage id="general.surveys_available_languages" />{' '}
        {Locales.map(({ label, id }, i) => (
          <span key={id} className="locale-selector-item">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setLocale(id);
              }}
            >
              {label}
            </a>
            {i < Locales.length - 1 ? <span>, </span> : <span>. </span>}
          </span>
        ))}
      </p>
      <a
        className="locale-selector-help"
        href="https://github.com/StateOfJS/StateOfCSS-2020/issues/2"
        target="_blank"
        rel="norefferer"
      >
        <FormattedMessage id="general.help_us_translate" />
      </a>
    </div>
  );
};


LocaleSelector.contextTypes = {
  getLocale: PropTypes.func,
  setLocale: PropTypes.func,
};

export default LocaleSelector;
