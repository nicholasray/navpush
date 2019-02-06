import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import PushLeft from './index';
import Hamburger from '../../../Hamburger';

afterEach( cleanup );

test( 'renders correct classnames before and after open', () => {
  const { getByTestId } = render(
    <PushLeft
      nav={ ( isOpen, toggle ) => (
        <div>
          <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
        </div>
      ) }
      navAttrs={ { 'data-testid': 'nav' } }
      sidebar={ () => <div /> }
      sidebarAttrs={ { 'data-testid': 'sidebar' } }
      overlayAttrs={ { 'data-testid': 'overlay' } }
      canvasAttrs={ { 'data-testid': 'canvas' } }
    >
      <div>body</div>
    </PushLeft>
  );

  expect( getByTestId( 'overlay' ) ).toHaveClass( 'NP-Overlay', 'NP-Overlay--left' );
  expect( getByTestId( 'canvas' ) ).toHaveClass( 'NP-Canvas', 'NP-Canvas--left' );
  expect( getByTestId( 'sidebar' ) ).toHaveClass( 'NP-Sidebar', 'NP-Sidebar--left' );
  expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav', 'NP-Nav--left' );

  fireEvent.click( getByTestId( 'hamburger' ) );

  expect( getByTestId( 'overlay' ) ).toHaveClass(
    'NP-Overlay',
    'NP-Overlay--left',
    'NP-Overlay--open'
  );
  expect( getByTestId( 'canvas' ) ).toHaveClass(
    'NP-Canvas',
    'NP-Canvas--left',
    'NP-Canvas--open'
  );
  expect( getByTestId( 'sidebar' ) ).toHaveClass(
    'NP-Sidebar',
    'NP-Sidebar--left',
    'NP-Sidebar--open'
  );
  expect( getByTestId( 'nav' ) ).toHaveClass(
    'NP-Nav',
    'NP-Nav--left',
    'NP-Nav--open'
  );
} );
