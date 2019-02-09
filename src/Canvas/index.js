import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const Canvas = ( { attrs, children, theme, styles, classes } ) => {
  return (
    <div { ...attrs } style={ styles } className={ cx( theme['Canvas'], classes ) }>
      {children}
    </div>
  );
};

Canvas.propTypes = {
  attrs: PropTypes.object,
  children: PropTypes.element,
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
