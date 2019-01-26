import React from 'react';
import PropTypes from 'prop-types';

function Hamburger( { theme, onClick } ) {
  return (
    <div onClick={ onClick } className={ theme.Hamburger }>
      <span className={ theme['Hamburger__top'] } />
      <span className={ theme['Hamburger__middle'] } />
      <span className={ theme['Hamburger__bottom'] } />
    </div>
  );
}

Hamburger.propTypes = {
  theme: PropTypes.object,
  onClick: PropTypes.func
};

Hamburger.defaultProps = {
  theme: {
    Hamburger__top: 'NP-Hamburger__top',
    Hamburger__middle: 'NP-Hamburger__middle',
    Hamburger__bottom: 'NP-Hamburger__bottom'
  }
};

export default Hamburger;
