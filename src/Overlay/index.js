import React from 'react';
import cx from 'classnames';

const Overlay = ( { classes, styles, onClick, isActive, theme } ) => {
  return (
    <div
      onClick={ onClick }
      style={ styles }
      className={ cx(
        theme.Overlay,
        {
          [theme['Overlay--active']]: isActive
        },
        classes
      ) }
    />
  );
};

export default Overlay;
