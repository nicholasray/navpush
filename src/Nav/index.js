import React from 'react';
import HamburgerMenu from 'react-hamburger-menu';
import cx from 'classnames';

class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
  }

  getHeight() {
    return this.ref.current.offsetHeight;
  }

  getWidth() {
    return this.ref.current.offsetWidth;
  }

  render() {
    const {
      theme,
      isBurgerOpen,
      onBurgerClick,
      styles,
      classes,
      children
    } = this.props;

    return (
      <nav ref={this.ref} style={styles} className={cx(theme.Nav, classes)}>
        <div className="container">
          <div className={theme.Nav__items}>
            {children}
            <div className={theme.Nav__hamburger}>
              <HamburgerMenu
                animationDuration={0.3}
                height={20}
                width={30}
                isOpen={isBurgerOpen}
                menuClicked={onBurgerClick}
                strokeWidth={4}
                color="white"
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
