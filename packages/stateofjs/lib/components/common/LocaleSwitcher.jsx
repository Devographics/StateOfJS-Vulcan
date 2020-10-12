import React from 'react';
import PropTypes from 'prop-types';
import { Components, Locales } from 'meteor/vulcan:core';

const LocaleSwitcher = (props, { setLocale, getLocale }) => {
  const currentLocaleId = getLocale(false);
  const currentLocale = Locales.find((locale) => locale.id === currentLocaleId);
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
        setLocale(Locales[index].id);
      }}
      className="nav-locale-dropdown"
      menuItems={Locales.map(({ label, id }) => ({
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
