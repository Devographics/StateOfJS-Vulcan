import React, { Component } from 'react';
import { intlShape } from 'meteor/vulcan:i18n';
import { replaceComponent, getString } from 'meteor/vulcan:core';
import { useKeydownContext } from './KeydownContext';
import { useDefaultLocaleContext } from './DefaultLocaleContext';

const getGitHubSearchUrl = (id, localeId) =>
  `https://github.com/search?q=${id}+repo%3AStateOfJS%2Fstate-of-js-graphql-results-api+path%3A%2Fsrc%2Fi18n%2F${localeId}%2F+path%3A%2Fsrc%2Fi18n%2Fen-US%2F&type=Code&ref=advsearch&l=&l=`;

const FormattedMessage = ({ id, values, defaultMessage = '', html = false, className = '' }, { intl }) => {
  const { modKeyDown } = useKeydownContext();
  const { defaultLocale } = useDefaultLocaleContext();

  let message = intl.formatMessage({ id, defaultMessage }, values);

  const props = {
    'data-key': id,
  };
  const classNames = ['i18n-message', className, 't'];

  const handleClick = (e) => {
    // note: `fallback` here denotes whether a string is itself a fallback for a missing string
    if (modKeyDown) {
      e.preventDefault();
      e.stopPropagation();
      window.open(getGitHubSearchUrl(id, intl.locale));
    }
  };

  if (message === '') {
    props.onClick = handleClick;
    props.title = 'Cmd/ctrl-click to add missing translation';
    classNames.push(modKeyDown ? 't-modkeydown' : 't-modkeyup');

    const defaultLocaleMessage = getString({
      id,
      defaultMessage,
      values,
      messages: defaultLocale.strings,
      locale: defaultLocale.id,
    });

    if (defaultLocaleMessage) {
      // a translation was found, but it's a fallback placeholder
      message = defaultLocaleMessage;
      classNames.push('t-fallback');
    } else {
      // no translation was found
      message = `[${intl.locale}] ${id}`;
      classNames.push('t-missing');
    }
  }

  props.className = classNames.join(' ');

  return html ? <span {...props} dangerouslySetInnerHTML={{ __html: message }} /> : <span {...props}>{message}</span>;
};

FormattedMessage.contextTypes = {
  intl: intlShape,
};

replaceComponent('FormattedMessage', FormattedMessage);
