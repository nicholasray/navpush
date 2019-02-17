import React from 'react';
import PropTypes from 'prop-types';
import Nav from '../../Nav';
import Fixbox from '../../Fixbox';
import Canvas from '../../Canvas';
import Overlay from '../../Overlay';
import cx from 'classnames';

class OffCanvas extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      isFixboxTransitioning: false,
      prevIsOpen: false
    };

    this.strategy = Object.assign( {
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
    props.strategy
    );

    this.handleTransitionEnd = this.handleTransitionEnd.bind( this );
    this.navRef = React.createRef();
    this.fixboxRef = React.createRef();
  }

  static getDerivedStateFromProps( props, state ) {
    if ( props.isOpen === state.prevIsOpen ) return null;

    return {
      isFixboxTransitioning: true,
      prevIsOpen: props.isOpen
    };
  }

  handleTransitionEnd() {
    this.setState( {
      isFixboxTransitioning: false
    } );
  }

  render() {
    const strategy = this.strategy;
    const theme = this.props.theme;
    const strategyParams = {
      nav: this.navRef.current,
      fixbox: this.fixboxRef.current,
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
        <Canvas
          attrs={ this.props.canvasAttrs }
          classes={ cx( {
            [theme['Canvas--open']]:
                theme['Canvas--open'] && this.props.isOpen
          } ) }
          styles={
            this.props.isMounted
              ? strategy.canvas.getStyles( strategyParams )
              : undefined
          }
          theme={ theme }
        >
          {this.props.children( this.props.isOpen, this.props.onToggle )}
        </Canvas>
        <Fixbox
          onTransitionEnd={ this.handleTransitionEnd }
          attrs={ this.props.fixboxAttrs }
          ref={ this.fixboxRef }
          classes={ cx( {
            [theme['Fixbox--open']]: theme['Fixbox--open'] && this.props.isOpen,
            [theme['Fixbox--transitioning']]: this.state.isFixboxTransitioning && theme['Fixbox--transitioning']
          } ) }
          styles={
            this.props.isMounted
              ? strategy.fixbox.getStyles( strategyParams )
              : undefined
          }
          theme={ theme }
        >
          {this.props.fixbox( this.props.isOpen, this.props.onToggle )}
        </Fixbox>
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

OffCanvas.propTypes = {
  canvasAttrs: PropTypes.object,
  fixbox: PropTypes.func.isRequired,
  fixboxAttrs: PropTypes.object,
  strategy: PropTypes.object.isRequired
};

OffCanvas.defaultProps = {
  theme: Object.assign(
    {
      'Fixbox--open': 'NP-Fixbox--open',
      'Canvas--open': 'NP-Canvas--open'
    },
    Fixbox.defaultProps.theme,
    Canvas.defaultProps.theme
  )
};

export default OffCanvas;
