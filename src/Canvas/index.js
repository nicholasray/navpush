import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Canvas = ( { attrs, children, onClick, theme, styles, classes } ) => {
  return (
    <div
      { ...attrs }
      onClick={ onClick }
      style={ styles }
      className={ cx( theme['Canvas'], classes ) }
    >
      {children}
    </div>
  );
};

Canvas.propTypes = {
  attrs: PropTypes.object,
  children: PropTypes.element,
  onClick: PropTypes.func,
  theme: PropTypes.object,
  styles: PropTypes.object,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] )
};

Canvas.defaultProps = {
  theme: {
    Canvas: 'NP-Canvas'
  },
  attrs: {}
};

export default Canvas;
