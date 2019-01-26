import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Canvas = ( { children, onClick, theme, styles, classes } ) => {
  return (
    <div
      onClick={ onClick }
      style={ styles }
      className={ cx( theme['Canvas'], classes ) }
    >
      {children}
    </div>
  );
};

Canvas.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
  theme: PropTypes.object,
  styles: PropTypes.object,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] )
};

Canvas.defaultProps = {
  theme: {
    Canvas: 'NP-Canvas'
  }
};

export default Canvas;
