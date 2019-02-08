import React from 'react';
import PropTypes from 'prop-types';

function Hamburger( { theme, onClick, attrs } ) {
  return (
    <button { ...attrs } onClick={ onClick } className={ theme.Hamburger }>
      <span className={ theme['Hamburger__line-container'] }>
        <span className={ theme['Hamburger__top'] } />
        <span className={ theme['Hamburger__middle'] } />
        <span className={ theme['Hamburger__bottom'] } />
      </span>
    </button>
  );
}

Hamburger.propTypes = {
  onClick: PropTypes.func.isRequired,
  theme: PropTypes.object,
  attrs: PropTypes.object
};

Hamburger.defaultProps = {
  theme: {
    Hamburger: 'NP-Hamburger',
    Hamburger__top: 'NP-Hamburger__top',
    Hamburger__middle: 'NP-Hamburger__middle',
    Hamburger__bottom: 'NP-Hamburger__bottom'
  },
  attrs: {}
};

export default Hamburger;
