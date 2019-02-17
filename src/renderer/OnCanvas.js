import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import Overlay from '../Overlay';
import cx from 'classnames';

class OnCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.strategy = Object.assign( {
      direction: '',
      nav: {
        getStyles() {}
      },
      overlay: {
        getStyles() {}
      }
    },
    props.strategy
    );

    this.navRef = React.createRef();
  }

  render() {
    const strategy = this.strategy;
    const theme = this.props.theme;
    const strategyParams = {
      nav: this.navRef.current,
      props: this.props,
      isOpen: this.props.isOpen
    };

    return (
      <div
        { ...this.props.attrs }
        className={ cx( theme.NavPush, {
          [theme['NavPush--open']]:
              theme['NavPush--open'] && this.props.isOpen
        } ) }
      >
        {this.props.children( this.props.isOpen, this.props.onToggle )}
        <Overlay
          onTouchStart={ this.props.isOpen ? this.props.onToggle : undefined }
          onClick={ this.props.isOpen ? this.props.onToggle : undefined }
          attrs={ this.props.overlayAttrs }
          classes={ cx( {
            [theme['Overlay--dim']]: theme['Overlay--dim'] && this.props.dim,
            [theme['Overlay--open']]:
                theme['Overlay--open'] && this.props.isOpen
          } ) }
          styles={
            this.props.isMounted
              ? strategy.overlay.getStyles( strategyParams )
              : undefined
          }
          theme={ theme }
          isActive={ this.props.isOpen }
        />
        <Nav
          attrs={ this.props.navAttrs }
          ref={ this.navRef }
          classes={ cx( {
            [theme['Nav--open']]:
                theme['Nav--open'] && this.props.isOpen
          } ) }
          styles={
            this.props.isMounted
              ? strategy.nav.getStyles( strategyParams )
              : undefined
          }
          theme={ theme }
        >
          {this.props.nav( this.props.isOpen, this.props.onToggle )}
        </Nav>
      </div>
    );
  }
}

OnCanvas.propTypes = {
  dim: PropTypes.bool,
  nav: PropTypes.func.isRequired,
  navAttrs: PropTypes.object,
  overlayAttrs: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

OnCanvas.defaultProps = {
  dim: true,
  theme: Object.assign(
    {
      NavPush: 'NP-NavPush',
      'NavPush--open': 'NP-NavPush--open',
      'Nav--open': 'NP-Nav--open',
      'Overlay--open': `NP-Overlay--open`,
    },
    Nav.defaultProps.theme,
    Overlay.defaultProps.theme
  )
};

export default OnCanvas;