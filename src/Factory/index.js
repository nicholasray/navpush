import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../Sidebar';
import Header from '../Header';
import Canvas from '../Canvas';
import Overlay from '../Overlay';
import cx from 'classnames';

const factory = strategy => {
  strategy = Object.assign(
    {
      direction: '',
      header: {
        getStyles() {}
      },
      sidebar: {
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
        isOpen: false
      };

      this.toggle = this.toggle.bind( this );
      this.sidebarRef = React.createRef();
      this.headerRef = React.createRef();
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
      const theme = this.props.theme;
      const strategyParams = {
        sidebar: this.sidebarRef.current,
        header: this.headerRef.current,
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
          <Header
            attrs={ this.props.headerAttrs }
            ref={ this.headerRef }
            classes={ cx( {
              [theme['Header--open']]: theme['Header--open'] && this.state.isOpen
            } ) }
            styles={
              this.state.isMounted
                ? strategy.header.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
          >
            {this.props.header( this.state.isOpen, this.toggle )}
          </Header>
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
          <Sidebar
            attrs={ this.props.sidebarAttrs }
            ref={ this.sidebarRef }
            classes={ cx( {
              [theme['Sidebar--open']]:
                theme['Sidebar--open'] && this.state.isOpen
            } ) }
            styles={
              this.state.isMounted
                ? strategy.sidebar.getStyles( strategyParams )
                : undefined
            }
            theme={ theme }
          >
            {this.props.sidebar( this.state.isOpen, this.toggle )}
          </Sidebar>
        </div>
      );
    }
  }

  NavPush.direction = strategy.direction;

  NavPush.propTypes = {
    dim: PropTypes.bool,
    header: PropTypes.func.isRequired,
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
        'Header--open': 'NP-Header--open',
        'Sidebar--open': 'NP-Sidebar--open',
        'Overlay--open': `NP-Overlay--open`,
        'Canvas--open': 'NP-Canvas--open'
      },
      Header.defaultProps.theme,
      Sidebar.defaultProps.theme,
      Overlay.defaultProps.theme,
      Canvas.defaultProps.theme
    )
  };

  return NavPush;
};

export default factory;
