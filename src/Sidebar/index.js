import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Sidebar extends React.Component {
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
    const { theme, children, classes, styles } = this.props;

    return (
      <div ref={ this.ref } style={ styles } className={ cx( theme.Sidebar, classes ) }>
        {children}
      </div>
    );
  }
}

Sidebar.propTypes = {
  theme: PropTypes.object,
  children: PropTypes.element,
  classes: PropTypes.oneOfType( [ PropTypes.array, PropTypes.string ] ),
  styles: PropTypes.object
};

Sidebar.defaultProps = {
  theme: {
    Sidebar: 'NP-Sidebar'
  }
};

export default Sidebar;
