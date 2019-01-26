import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Overlay = ( { classes, styles, onClick, isActive, theme } ) => {
  return (
    <div
      onClick={ onClick }
      style={ styles }
      className={ cx( theme.Overlay, classes ) }
    />
  );
};

Overlay.propTypes = {
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
  styles: PropTypes.object,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  theme: PropTypes.object
};

Overlay.defaultProps = {
  theme: {
    Overlay: 'NP-Overlay'
  }
};

export default Overlay;
