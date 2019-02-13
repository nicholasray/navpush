import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Fixbox extends React.Component {
  constructor( props ) {
    super( props );

    this.ref = React.createRef();
  }

  getHeight() {
    return this.ref.current.offsetHeight;
  }

  getWidth() {
    return this.ref.current.offsetWidth;
  }

  render() {
    const { attrs, theme, styles, classes, children, onTransitionEnd } = this.props;

    return (
      <div
        { ...attrs }
        onTransitionEnd={ onTransitionEnd }
        ref={ this.ref }
        style={ styles }
        className={ cx( theme.Fixbox, classes ) }
      >
        {children}
      </div>
    );
  }
}

Fixbox.propTypes = {
  attrs: PropTypes.object,
  theme: PropTypes.object,
  styles: PropTypes.object,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
  children: PropTypes.element
};

Fixbox.defaultProps = {
  theme: {
    Fixbox: 'NP-Fixbox'
  },
  attrs: {}
};

export default Fixbox;
