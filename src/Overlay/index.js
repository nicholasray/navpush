import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Overlay = ( { attrs, classes, styles, onClick, isActive, theme } ) => {
  return (
    <div
      { ...attrs }
      onClick={ onClick }
      style={ styles }
      className={ cx( theme.Overlay, classes ) }
    />
  );
};

Overlay.propTypes = {
  attrs: PropTypes.object,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
  styles: PropTypes.object,
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  theme: PropTypes.object
};

Overlay.defaultProps = {
  theme: {
    Overlay: 'NP-Overlay'
  },
  attrs: {}
};

export default Overlay;
