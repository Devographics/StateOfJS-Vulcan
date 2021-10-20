import React from 'react';
import PropTypes from 'prop-types';
import { Components, getLocale } from 'meteor/vulcan:core';
import { useLocales } from '../../hooks/locales';

const LocaleSwitcher = (props, { setLocale, getLocale: getLocaleContext }) => {
  const { loading, locales = [] } = useLocales();
  if (loading) {
    return <Components.Loading />;
  }

  const currentLocaleId = getLocaleContext();
  const currentLocale = getLocale(currentLocaleId);
  return (
    <Components.Dropdown
      buttonProps={{
        variant: 'default',
      }}
      label={(currentLocale && currentLocale.label) || currentLocaleId}
      id="locale-dropdown"
      onSelect={(index) => {
        if (!index) {
          index = 0;
        }
        setLocale(locales[index].id);
      }}
      className="nav-locale-dropdown"
      menuItems={locales.map(({ label, id }) => ({
        label: id === currentLocale && currentLocale.id ? `${label} ✓` : label,
      }))}
    />
  );
};

LocaleSwitcher.contextTypes = {
  getLocale: PropTypes.func,
  setLocale: PropTypes.func,
};

export default LocaleSwitcher;
