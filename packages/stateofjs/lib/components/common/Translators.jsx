import React from 'react';
import { Components } from 'meteor/vulcan:core';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const localesQuery = `query LocalesQuery {
  locales{
    id
    label
    translators
    repo
    translatedCount
    totalCount
    completion
  }
}
`;

const Translators = () => {
  const { loading, data = {} } = useQuery(gql(localesQuery));

  const { locales } = data;

  return (
    <div className="translators">
      <h3 className="translators-heading">
        <Components.FormattedMessage id="general.translation_help" />
      </h3>
      <div className="translators-locales">
        {loading ? (
          <Components.Loading />
        ) : (
          locales &&
          locales
            .filter((l) => l.translators && l.translators.length > 0)
            .map((l) => <LocaleItem key={l.id} locale={l} />)
        )}
      </div>
      <h4 className="translators-help">
        <a href="https://github.com/StateOfJS/locale-en-US#readme" target="_blank" rel="noopener noreferrer">
          <Components.FormattedMessage id="general.help_us_translate" />
        </a>
      </h4>
    </div>
  );
};

const LocaleItem = ({ locale }) => {
  const { label, translators } = locale;
  return (
    <div className="translators-locale">
      <h4 className="translators-locale-heading">{label}</h4>
      <div className="translators-locale-translators">
        {translators.map((name, i) => (
          <span key={name}>
            <a
              className="translators-locale-translator"
              key={name}
              href={`https://github.com/${name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>
            {i < translators.length - 1 && ', '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Translators;
