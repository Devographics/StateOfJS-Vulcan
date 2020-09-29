import React from 'react';
import PropTypes from 'prop-types';
import { Components, Locales } from 'meteor/vulcan:core';

const LocaleSwitcher = (props, { setLocale, getLocale }) => {
  const currentLocale = Locales.find(locale => locale.id === getLocale(true));
  return (
    <Components.Dropdown
      buttonProps={{
        variant: 'default'
      }}
      label={currentLocale.label}
      id="locale-dropdown"
      onSelect={index => {
        setLocale(Locales[index].id);
      }}
      className="nav-locale-dropdown"
      menuItems={Locales.map(({ label, id }) => ({
        label: id === currentLocale.id ? `${label} ✓` : label,
      }))}
    />
  );
};

LocaleSwitcher.contextTypes = {
  getLocale: PropTypes.func,
  setLocale: PropTypes.func,
};

export default LocaleSwitcher;