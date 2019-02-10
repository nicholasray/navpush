import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Nav extends React.Component {
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
    const { attrs, theme, styles, classes, children } = this.props;

    return (
      <div
        { ...attrs }
        ref={ this.ref }
        style={ styles }
        className={ cx( theme.Nav, classes ) }
      >
        {children}
      </div>
    );
  }
}

Nav.propTypes = {
  attrs: PropTypes.object,
  theme: PropTypes.object,
  styles: PropTypes.object,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
  children: PropTypes.element
};

Nav.defaultProps = {
  theme: {
    Nav: 'NP-Nav'
  },
  attrs: {}
};

export default Nav;
