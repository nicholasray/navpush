import React from 'react';

function Hamburger( { theme, onClick } ) {
  return (
    <div onClick={ onClick } className={ theme.Hamburger }>
      <span className={ theme['Hamburger__top'] } />
      <span className={ theme['Hamburger__middle'] } />
      <span className={ theme['Hamburger__bottom'] } />
    </div>
  );
}

export default Hamburger;
