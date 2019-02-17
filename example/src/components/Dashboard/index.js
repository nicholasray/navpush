import React from 'react';
import * as navpush from 'navpush';
import OverlayLeftTheme from 'navpush/dist/styles/OverlayLeft.module.scss';
import OverlayRightTheme from 'navpush/dist/styles/OverlayRight.module.scss';
import OverlayTopTheme from 'navpush/dist/styles/OverlayTop.module.scss';
import PushLeftTheme from 'navpush/dist/styles/PushLeft.module.scss';
import PushRightTheme from 'navpush/dist/styles/PushRight.module.scss';
import PushTopTheme from 'navpush/dist/styles/PushTop.module.scss';
import UncoverLeftTheme from 'navpush/dist/styles/UncoverLeft.module.scss';
import UncoverRightTheme from 'navpush/dist/styles/UncoverRight.module.scss';
import HamburgerTheme from 'navpush/dist/styles/Hamburger.module.scss';
import Button from '../Button';
import cx from 'classnames';
import pageTheme from './styles.module.scss';

function generateComponents() {
  const themes = {
    OverlayLeftTheme,
    OverlayRightTheme,
    OverlayTopTheme,
    PushLeftTheme,
    PushRightTheme,
    PushTopTheme,
    UncoverLeftTheme,
    UncoverRightTheme
  };
  const strategies = {};

  for ( const key of Object.keys( navpush ) ) {
    if ( key === 'Hamburger' ) continue;

    const direction =
      navpush[key].direction.charAt( 0 ).toUpperCase() +
      navpush[key].direction.slice( 1 );
    const name = key.split( direction )[0];

    if ( !strategies[name] ) {
      strategies[name] = {};
    }

    strategies[name][direction] = {
      component: navpush[key],
      theme: themes[`${key}Theme`]
    };
  }

  return strategies;
}

class Dashboard extends React.Component {
  constructor( props ) {
    super( props );

    this.components = generateComponents();
    this.state = {
      name: 'Push',
      direction: 'Left'
    };

    this.handleNameClick = this.handleNameClick.bind( this );
    this.handleDirectionClick = this.handleDirectionClick.bind( this );
  }

  handleNameClick( name ) {
    this.setState( {
      name
    } );
  }

  handleDirectionClick( direction ) {
    this.setState( {
      direction
    } );
  }

  renderNameOptions() {
    const buttons = [];

    for ( const key of Object.keys( this.components ) ) {
      buttons.push(
        <Button
          key={ key }
          onClick={ this.handleNameClick }
          isActive={ this.state.name === key }
          label={ key }
        />
      );
    }

    return buttons;
  }

  renderDirectionOptions() {
    const buttons = [];

    for ( const key of Object.keys( this.components[this.state.name] ) ) {
      buttons.push(
        <Button
          key={ key }
          onClick={ this.handleDirectionClick }
          isActive={ this.state.direction === key }
          label={ key }
        />
      );
    }

    return buttons;
  }

  renderHeader( toggle, pageTheme ) {
    return (
      <>
        <header className={ pageTheme.Fixbox }>
          <div className="container">
            <div className={ pageTheme.Fixbox__items }>
              navpush
              <navpush.Hamburger onClick={ toggle } theme={ HamburgerTheme } />
            </div>
          </div>
        </header>
        <div id={ pageTheme.foo } />
      </>
    );
  }

  render() {
    const pair = this.components[this.state.name][this.state.direction];
    const NavPush = pair.component;
    const theme = pair.theme;
    const supportsFixbox = NavPush.renderer.propTypes['fixbox'];

    return (
      <NavPush
        theme={ theme }
        fixbox={
          supportsFixbox &&
          ( ( isOpen, toggle ) => this.renderHeader( toggle, pageTheme ) )
        }
        nav={ ( isOpen, toggle ) => (
          <div className={ pageTheme.NavInner }>You can put anything in here</div>
        ) }
      >
        {( isOpen, toggle ) => (
          <>
            <section className="hero is-primary is-fullheight">
              <div className="hero-body">
                <div className={ cx( 'container', pageTheme.ButtonContainer ) }>
                  <div className="buttons">{this.renderNameOptions()}</div>
                  <div className="buttons">{this.renderDirectionOptions()}</div>
                </div>
              </div>
            </section>
            {!supportsFixbox && this.renderHeader( toggle, pageTheme )}
          </>
        )}
      </NavPush>
    );
  }
}

export default Dashboard;
