import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
import Canvas from '../Canvas';
import Overlay from '../Overlay';
import cx from 'classnames';

const factory = strategy => {
  if ( !strategy.direction ) {
    throw new Error( "Strategy object must have 'direction' property" );
  }

  class NavPush extends React.Component {
    constructor( props ) {
      super( props );

      this.state = {
        isOpen: false
      };

      this.toggle = this.toggle.bind( this );
      this.handleCanvasClick = this.handleCanvasClick.bind( this );
      this.sidebarRef = React.createRef();
      this.navRef = React.createRef();
    }

    toggle() {
      this.setState( {
        isOpen: !this.state.isOpen
      } );
    }

    handleCanvasClick() {
      if ( !this.state.isOpen ) {
        return;
      }

      this.toggle();
    }

    render() {
      const theme = this.props.theme;
      const strategyParams = {
        sidebar: this.sidebarRef.current,
        nav: this.navRef.current,
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
          <Nav
            attrs={ this.props.navAttrs }
            ref={ this.navRef }
            classes={ cx( {
              [theme['Nav--open']]: theme['Nav--open'] && this.state.isOpen
            } ) }
            styles={ strategy.nav && strategy.nav.getStyles( strategyParams ) }
            theme={ theme }
          >
            {this.props.nav( this.state.isOpen, this.toggle )}
          </Nav>
          <Sidebar
            attrs={ this.props.sidebarAttrs }
            ref={ this.sidebarRef }
            classes={ cx( {
              [theme['Sidebar--open']]:
                theme['Sidebar--open'] && this.state.isOpen
            } ) }
            styles={
              strategy.sidebar && strategy.sidebar.getStyles( strategyParams )
            }
            theme={ theme }
          >
            {this.props.sidebar( this.state.isOpen, this.toggle )}
          </Sidebar>
          {this.props.dim && (
            <Overlay
              attrs={ this.props.overlayAttrs }
              onClick={ this.handleCanvasClick }
              classes={ cx( {
                [theme['Overlay--open']]:
                  theme['Overlay--open'] && this.state.isOpen
              } ) }
              styles={
                strategy.overlay && strategy.overlay.getStyles( strategyParams )
              }
              theme={ theme }
              isActive={ this.state.isOpen }
            />
          )}
          <Canvas
            attrs={ this.props.canvasAttrs }
            onClick={ this.handleCanvasClick }
            classes={ cx( {
              [theme['Canvas--open']]:
                theme['Canvas--open'] && this.state.isOpen
            } ) }
            styles={
              strategy.canvas && strategy.canvas.getStyles( strategyParams )
            }
            theme={ theme }
          >
            {this.props.children}
          </Canvas>
        </div>
      );
    }
  }

  NavPush.direction = strategy.direction;

  NavPush.propTypes = {
    dim: PropTypes.bool,
    nav: PropTypes.func.isRequired,
    sidebar: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    navAttrs: PropTypes.object,
    sidebarAttrs: PropTypes.object,
    overlayAttrs: PropTypes.object,
    canvasAttrs: PropTypes.object
  };

  NavPush.defaultProps = {
    dim: true,
    theme: Object.assign(
      {
        NavPush: 'NP-NavPush',
        'NavPush--open': 'NP-NavPush--open',
        'Nav--open': 'NP-Nav--open',
        'Sidebar--open': 'NP-Sidebar--open',
        'Overlay--open': `NP-Overlay--open`,
        'Canvas--open': 'NP-Canvas--open'
      },
      Nav.defaultProps.theme,
      Sidebar.defaultProps.theme,
      Overlay.defaultProps.theme,
      Canvas.defaultProps.theme
    )
  };

  return NavPush;
};

export default factory;
