import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../Nav';
import Fixbox from '../Fixbox';
import Canvas from '../Canvas';
import Overlay from '../Overlay';
import cx from 'classnames';

const factory = strategy => {
  strategy = Object.assign(
    {
      direction: '',
      fixbox: {
        getStyles() {}
      },
      nav: {
        getStyles() {}
      },
      canvas: {
        getStyles() {}
      },
      overlay: {
        getStyles() {}
      }
    },
    strategy
  );

  class NavPush extends React.Component {
    constructor( props ) {
      super( props );

      this.state = {
        isMounted: false,
        isOpen: false,
        isFixboxTransitioning: false
      };

      this.handleTransitionEnd = this.handleTransitionEnd.bind( this );
      this.toggle = this.toggle.bind( this );
      this.navRef = React.createRef();
      this.fixboxRef = React.createRef();
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
        isFixboxTransitioning: true,
        isOpen: !this.state.isOpen
      } );
    }

    handleTransitionEnd() {
      this.setState( {
        isFixboxTransitioning: false
      } );
    }

    render() {
      const theme = this.props.theme;
      const strategyParams = {
        nav: this.navRef.current,
        fixbox: this.fixboxRef.current,
        props: this.props,
        isOpen: this.state.isOpen
      };

      return (
        <div
          { ...this.props.attrs }
          className={ cx( theme.NavPush, {
            [theme['NavPush--open']]:
              theme['NavPush--open'] && this.state.isOpen
          } ) }
        >
          <Canvas
            attrs={ this.props.canvasAttrs }
            classes={ cx( {
              [theme['Canvas--open']]:
                theme['Canvas--open'] && this.state.isOpen
            } ) }
            styles={
              this.state.isMounted
                ? strategy.canvas.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
          >
            {this.props.children}
          </Canvas>
          <Fixbox
            onTransitionEnd={ this.handleTransitionEnd }
            attrs={ this.props.fixboxAttrs }
            ref={ this.fixboxRef }
            classes={ cx( {
              [theme['Fixbox--open']]: theme['Fixbox--open'] && this.state.isOpen,
              [theme['Fixbox--transitioning']]: this.state.isFixboxTransitioning && theme['Fixbox--transitioning']
            } ) }
            styles={
              this.state.isMounted
                ? strategy.fixbox.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
          >
            {this.props.fixbox( this.state.isOpen, this.toggle )}
          </Fixbox>
          <Overlay
            onTouchStart={ this.state.isOpen ? this.toggle : undefined }
            onClick={ this.state.isOpen ? this.toggle : undefined }
            attrs={ this.props.overlayAttrs }
            classes={ cx( {
              [theme['Overlay--dim']]: theme['Overlay--dim'] && this.props.dim,
              [theme['Overlay--open']]:
                theme['Overlay--open'] && this.state.isOpen
            } ) }
            styles={
              this.state.isMounted
                ? strategy.overlay.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
            isActive={ this.state.isOpen }
          />
          <Nav
            attrs={ this.props.navAttrs }
            ref={ this.navRef }
            classes={ cx( {
              [theme['Nav--open']]:
                theme['Nav--open'] && this.state.isOpen
            } ) }
            styles={
              this.state.isMounted
                ? strategy.nav.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
          >
            {this.props.nav( this.state.isOpen, this.toggle )}
          </Nav>
        </div>
      );
    }
  }

  NavPush.direction = strategy.direction;

  NavPush.propTypes = {
    dim: PropTypes.bool,
    fixbox: PropTypes.func.isRequired,
    nav: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    fixboxAttrs: PropTypes.object,
    navAttrs: PropTypes.object,
    overlayAttrs: PropTypes.object,
    canvasAttrs: PropTypes.object
  };

  NavPush.defaultProps = {
    dim: true,
    theme: Object.assign(
      {
        NavPush: 'NP-NavPush',
        'NavPush--open': 'NP-NavPush--open',
        'Fixbox--open': 'NP-Fixbox--open',
        'Nav--open': 'NP-Nav--open',
        'Overlay--open': `NP-Overlay--open`,
        'Canvas--open': 'NP-Canvas--open'
      },
      Fixbox.defaultProps.theme,
      Nav.defaultProps.theme,
      Overlay.defaultProps.theme,
      Canvas.defaultProps.theme
    )
  };

  return NavPush;
};

export default factory;
