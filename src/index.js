import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Nav from './Nav';
import Canvas from './Canvas';
import Overlay from './Overlay';
import cx from 'classnames';

const setup = strategy => {
  if (!strategy.direction) {
    throw new Error("Strategy object must have 'direction' property");
  }

  class NavPush extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isOpen: false
      };

      this.handleBurgerClick = this.handleBurgerClick.bind(this);
      this.handleCanvasClick = this.handleCanvasClick.bind(this);
      this.sidebarRef = React.createRef();
      this.navRef = React.createRef();
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    handleBurgerClick() {
      this.toggle();
    }

    handleCanvasClick() {
      if (!this.state.isOpen) {
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
      const clonedSidebar = React.cloneElement(this.props.sidebar, {
        isOpen: this.state.isOpen,
        animation: this.props.animation,
        ref: this.sidebarRef,
        classes: [
          theme[`Sidebar--${strategy.direction}`],
          { [theme['Sidebar--open']]: this.state.isOpen }
        ],
        styles: strategy.sidebar && strategy.sidebar.getStyles(strategyParams),
        theme
      });
      const clonedNav = React.cloneElement(this.props.nav, {
        isBurgerOpen: this.state.isOpen,
        onBurgerClick: this.handleBurgerClick,
        animation: this.props.animation,
        ref: this.navRef,
        classes: [
          theme[`Nav--${strategy.direction}`],
          { [theme['Nav--open']]: this.state.isOpen }
        ],
        styles: strategy.nav && strategy.nav.getStyles(strategyParams),
        theme
      });

      return (
        <div
          className={cx(theme.NavPush, {
            [theme['NavPush--open']]: this.state.isOpen
          })}
        >
          {clonedNav}
          {clonedSidebar}
          {this.props.dim && (
            <Overlay
              onClick={this.handleCanvasClick}
              classes={[
                theme[`Overlay--${strategy.direction}`],
                { [theme['Overlay--open']]: this.state.isOpen }
              ]}
              styles={
                strategy.overlay && strategy.overlay.getStyles(strategyParams)
              }
              theme={theme}
              isActive={this.state.isOpen}
            />
          )}
          <Canvas
            onClick={this.handleCanvasClick}
            classes={[
              theme[`Canvas--${strategy.direction}`],
              { [theme['Canvas--open']]: this.state.isOpen }
            ]}
            styles={
              strategy.canvas && strategy.canvas.getStyles(strategyParams)
            }
            theme={theme}
          >
            {this.props.children}
          </Canvas>
        </div>
      );
    }
  }

  NavPush.Sidebar = Sidebar;
  NavPush.Nav = Nav;

  NavPush.propTypes = {
    dim: PropTypes.bool,
    nav: PropTypes.element.isRequired,
    sidebar: PropTypes.element.isRequired,
    theme: PropTypes.object.isRequired
  };

  NavPush.defaultProps = Object.assign(
    {
      dim: false
    },
    strategy.defaults
  );

  return NavPush;
};

export default setup;
