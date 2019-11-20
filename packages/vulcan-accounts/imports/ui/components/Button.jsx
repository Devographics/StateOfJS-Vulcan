import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Utils, Components, registerComponent } from 'meteor/vulcan:core';

export class AccountsButton extends PureComponent {
  render () {

    const {
      label,
      // href = null,
      type,
      disabled = false,
      className,
      onClick
    } = this.props;

    const buttonClass = `${className} accounts-button accounts-button-${Utils.slugify(label)}`;

    return type === 'link' ? 
      <a href="#" className={buttonClass} onClick={onClick}>{label}</a> :
      <Components.Button
        variant="primary"
        className={buttonClass}
        type={type}
        disabled={disabled}
        onClick={onClick}>
        {label}
      </Components.Button>;
  }
}
AccountsButton.propTypes = {
  onClick: PropTypes.func
};

registerComponent('AccountsButton', AccountsButton);