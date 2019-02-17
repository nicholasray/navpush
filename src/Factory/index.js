import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import Overlay from '../Overlay';

const factory = strategy => {
  class NavPush extends React.Component {
    constructor( props ) {
      super( props );

      this.state = {
        isMounted: false,
        isOpen: false,
      };

      this.toggle = this.toggle.bind( this );
    }

    componentDidMount() {
      this.setState( {
        isMounted: true
      } );
    }

    componentWillUnmount() {
      // in case we unmount when the overlay is open
      window.removeEventListener( 'scroll', this.toggle );
    }

    toggle() {
      this.state.isOpen
        ? window.removeEventListener( 'scroll', this.toggle )
        : window.addEventListener( 'scroll', this.toggle );

      this.setState( {
        isOpen: !this.state.isOpen
      } );
    }

    render() {
      const Renderer = strategy.renderer;

      return (
        <Renderer strategy={ strategy } isOpen={ this.state.isOpen } isMounted={ this.state.isMounted } onToggle={ this.toggle } { ...this.props } />
      );
    }
  }

  NavPush.direction = strategy.direction;
  NavPush.renderer = strategy.renderer;

  NavPush.propTypes = Object.assign( {
    dim: PropTypes.bool,
    navAttrs: PropTypes.object,
    overlayAttrs: PropTypes.object,
    nav: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
  },
  strategy.propTypes
  );

  NavPush.defaultProps = {
    dim: true,
    theme: Object.assign(
      {
        NavPush: 'NP-NavPush',
        'NavPush--open': 'NP-NavPush--open',
        'Nav--open': 'NP-Nav--open',
        'Overlay--open': `NP-Overlay--open`,
      },
      Nav.defaultProps.theme,
      Overlay.defaultProps.theme,
      strategy.renderer.defaultProps.theme
    )
  };

  return NavPush;
};

export default factory;
