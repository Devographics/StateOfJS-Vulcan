import React from 'react';
import PropTypes from 'prop-types';
import { Components, Locales } from 'meteor/vulcan:core';

const LocaleSelector = (props, { setLocale, getLocale }) => {
  return (
    <div className="locale-selector">
      <p className="locale-selector-languages">
        <Components.FormattedMessage id="general.surveys_available_languages" />{' '}
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
        href="https://github.com/StateOfJS/Translations/issues/1"
        target="_blank"
        rel="norefferer"
      >
        <Components.FormattedMessage id="general.help_us_translate" />
      </a>
    </div>
  );
};

LocaleSelector.contextTypes = {
  getLocale: PropTypes.func,
  setLocale: PropTypes.func,
};

export default LocaleSelector;
