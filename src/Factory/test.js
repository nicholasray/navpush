import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from '../Hamburger';
import setup from './index';

afterEach( cleanup );

describe( 'when theme is not passed', () => {
  test( 'renders default classnames before and after open', () => {
    const NavPush = setup( {
      direction: 'foo'
    } );
    const { getByTestId } = render(
      <NavPush
        attrs={ { 'data-testid': 'np' } }
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

    expect( getByTestId( 'np' ) ).toHaveClass( 'NP-NavPush' );
    expect( getByTestId( 'overlay' ) ).toHaveClass( 'NP-Overlay' );
    expect( getByTestId( 'canvas' ) ).toHaveClass( 'NP-Canvas' );
    expect( getByTestId( 'sidebar' ) ).toHaveClass( 'NP-Sidebar' );
    expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav' );

    fireEvent.click( getByTestId( 'hamburger' ) );

    expect( getByTestId( 'np' ) ).toHaveClass( 'NP-NavPush--open' );
    expect( getByTestId( 'overlay' ) ).toHaveClass(
      'NP-Overlay',
      'NP-Overlay--open'
    );
    expect( getByTestId( 'canvas' ) ).toHaveClass( 'NP-Canvas', 'NP-Canvas--open' );
    expect( getByTestId( 'sidebar' ) ).toHaveClass(
      'NP-Sidebar',
      'NP-Sidebar--open'
    );
    expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav', 'NP-Nav--open' );
  } );
} );

describe( 'when theme is passed', () => {
  test( 'renders theme classnames before and after open', () => {
    const NavPush = setup( {
      direction: 'foo'
    } );
    const theme = {
      NavPush: 'Foo-NavPush',
      'NavPush--open': 'Foo-NavPush--open',
      Overlay: 'Foo-Overlay',
      'Overlay--open': 'Foo-Overlay--open',
      Canvas: 'Foo-Canvas',
      'Canvas--open': 'Foo-Canvas--open',
      Sidebar: 'Foo-Sidebar',
      'Sidebar--open': 'Foo-Sidebar--open',
      Nav: 'Foo-Nav',
      'Nav--open': 'Foo-Nav--open'
    };
    const { getByTestId } = render(
      <NavPush
        attrs={ { 'data-testid': 'np' } }
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
        theme={ theme }
      >
        <div>body</div>
      </NavPush>
    );

    expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush' );
    expect( getByTestId( 'overlay' ) ).toHaveClass( 'Foo-Overlay' );
    expect( getByTestId( 'canvas' ) ).toHaveClass( 'Foo-Canvas' );
    expect( getByTestId( 'sidebar' ) ).toHaveClass( 'Foo-Sidebar' );
    expect( getByTestId( 'nav' ) ).toHaveClass( 'Foo-Nav' );

    fireEvent.click( getByTestId( 'hamburger' ) );

    expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush--open' );
    expect( getByTestId( 'overlay' ) ).toHaveClass(
      'Foo-Overlay',
      'Foo-Overlay--open'
    );
    expect( getByTestId( 'canvas' ) ).toHaveClass( 'Foo-Canvas', 'Foo-Canvas--open' );
    expect( getByTestId( 'sidebar' ) ).toHaveClass(
      'Foo-Sidebar',
      'Foo-Sidebar--open'
    );
    expect( getByTestId( 'nav' ) ).toHaveClass( 'Foo-Nav', 'Foo-Nav--open' );
  } );
} );
