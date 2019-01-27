import React from 'react';
import cx from 'classnames';

export default ({ onClick, label, isActive, theme }) => {
  return (
    <button
      onClick={ () => {
        onClick(label);
      } }
      className={ cx('button', { 'is-active': isActive }) }
    >
      {label}
    </button>
  );
};
