import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from '../Hamburger';
import setup from './index';

afterEach( cleanup );

test( 'renders correct classnames before and after open', () => {
  const directions = [ 'left', 'right', 'bottom', 'top', 'foo' ];

  directions.forEach( direction => {
    const NavPush = setup( {
      direction
    } );
    const { getByTestId } = render(
      <NavPush
        nav={ ( isOpen, toggle ) => (
          <div>
            <Hamburger
              onClick={ toggle }
              attrs={ { 'data-testid': 'hamburger' } }
            />
          </div>
        ) }
        navAttrs={ { 'data-testid': 'nav' } }
        sidebar={ () => <div /> }
        sidebarAttrs={ { 'data-testid': 'sidebar' } }
        overlayAttrs={ { 'data-testid': 'overlay' } }
        canvasAttrs={ { 'data-testid': 'canvas' } }
      >
        <div>body</div>
      </NavPush>
    );

    expect( getByTestId( 'overlay' ) ).toHaveClass(
      'NP-Overlay',
      `NP-Overlay--${direction}`
    );
    expect( getByTestId( 'canvas' ) ).toHaveClass(
      'NP-Canvas',
      `NP-Canvas--${direction}`
    );
    expect( getByTestId( 'sidebar' ) ).toHaveClass(
      'NP-Sidebar',
      `NP-Sidebar--${direction}`
    );
    expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav', `NP-Nav--${direction}` );

    fireEvent.click( getByTestId( 'hamburger' ) );

    expect( getByTestId( 'overlay' ) ).toHaveClass(
      'NP-Overlay',
      `NP-Overlay--${direction}`,
      'NP-Overlay--open'
    );
    expect( getByTestId( 'canvas' ) ).toHaveClass(
      'NP-Canvas',
      `NP-Canvas--${direction}`,
      'NP-Canvas--open'
    );
    expect( getByTestId( 'sidebar' ) ).toHaveClass(
      'NP-Sidebar',
      `NP-Sidebar--${direction}`,
      'NP-Sidebar--open'
    );
    expect( getByTestId( 'nav' ) ).toHaveClass(
      'NP-Nav',
      `NP-Nav--${direction}`,
      'NP-Nav--open'
    );

    cleanup();
  } );
} );
