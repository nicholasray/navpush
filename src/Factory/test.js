import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from '../Hamburger';
import setup from './index';
import Sidebar from '../Sidebar';
import Nav from '../Nav';
let props;

beforeEach( () => {
  props = {
    attrs: { 'data-testid': 'np' },
    nav: ( isOpen, toggle ) => (
      <div>
        <div>Nav content</div>
        <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
      </div>
    ),
    navAttrs: { 'data-testid': 'nav' },
    sidebar: () => <div>Sidebar content</div>,
    sidebarAttrs: { 'data-testid': 'sidebar' },
    overlayAttrs: { 'data-testid': 'overlay' },
    canvasAttrs: { 'data-testid': 'canvas' }
  };
} );
afterEach( cleanup );

describe( 'when theme is not passed', () => {
  it( 'renders default classnames when opened and closed', () => {
    const NavPush = setup( {
      direction: 'foo'
    } );
    const { getByTestId } = render(
      <NavPush { ...props }>
        <div>body</div>
      </NavPush>
    );
    const assertClosed = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'NP-NavPush' );
      expect( getByTestId( 'overlay' ) ).toHaveClass( 'NP-Overlay' );
      expect( getByTestId( 'canvas' ) ).toHaveClass( 'NP-Canvas' );
      expect( getByTestId( 'sidebar' ) ).toHaveClass( 'NP-Sidebar' );
      expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav' );
    };

    const assertOpen = () => {
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
    };

    // Check that clicking hamburger can open/close
    assertClosed();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertClosed();

    // Check that clicking overlay can close as well
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'overlay' ) );
    assertClosed();
  } );
} );

describe( 'when theme is passed', () => {
  it( 'renders theme classnames when opened and closed', () => {
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
      <NavPush { ...props } theme={ theme }>
        <div>body</div>
      </NavPush>
    );

    const assertClosed = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush' );
      expect( getByTestId( 'overlay' ) ).toHaveClass( 'Foo-Overlay' );
      expect( getByTestId( 'canvas' ) ).toHaveClass( 'Foo-Canvas' );
      expect( getByTestId( 'sidebar' ) ).toHaveClass( 'Foo-Sidebar' );
      expect( getByTestId( 'nav' ) ).toHaveClass( 'Foo-Nav' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).toHaveClass(
        'Foo-Overlay',
        'Foo-Overlay--open'
      );
      expect( getByTestId( 'canvas' ) ).toHaveClass(
        'Foo-Canvas',
        'Foo-Canvas--open'
      );
      expect( getByTestId( 'sidebar' ) ).toHaveClass(
        'Foo-Sidebar',
        'Foo-Sidebar--open'
      );
      expect( getByTestId( 'nav' ) ).toHaveClass( 'Foo-Nav', 'Foo-Nav--open' );
    };

    // Check that clicking hamburger can open/close
    assertClosed();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertClosed();

    // Check that clicking overlay can close as well
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'overlay' ) );
    assertClosed();
  } );
} );

describe( 'when dim is disabled', () => {
  it( 'does not render overlay', () => {
    const NavPush = setup( {
      direction: 'foo'
    } );
    const { getByTestId, container } = render(
      <NavPush { ...props } dim={ false }>
        <div>body</div>
      </NavPush>
    );

    fireEvent.click( getByTestId( 'hamburger' ) );

    expect( container.querySelector( '.NP-Overlay' ) ).not.toBeInTheDocument();
  } );
} );

describe( 'when strategy includes inline styles', () => {
  it( 'renders inline styles', () => {
    const passedProps = props;
    const NavPush = setup( {
      direction: 'foo',
      nav: {
        getStyles( { sidebar, nav, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(10px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(100px)`
          };
        }
      },
      sidebar: {
        getStyles( { sidebar, nav, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(20px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(200px)`
          };
        }
      },
      overlay: {
        getStyles( { sidebar, nav, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(30px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(300px)`
          };
        }
      },
      canvas: {
        getStyles( { sidebar, nav, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(40px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(400px)`
          };
        }
      }
    } );
    const { getByTestId } = render(
      <NavPush { ...props }>
        <div>body</div>
      </NavPush>
    );

    const assertClosed = () => {
      expect( getByTestId( 'nav' ) ).toHaveStyle( 'transform: translateX(10px)' );
      expect( getByTestId( 'sidebar' ) ).toHaveStyle( 'transform: translateX(20px)' );
      expect( getByTestId( 'overlay' ) ).toHaveStyle( 'transform: translateX(30px)' );
      expect( getByTestId( 'canvas' ) ).toHaveStyle( 'transform: translateX(40px)' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'nav' ) ).toHaveStyle( 'transform: translateX(100px)' );
      expect( getByTestId( 'sidebar' ) ).toHaveStyle(
        'transform: translateX(200px)'
      );
      expect( getByTestId( 'overlay' ) ).toHaveStyle(
        'transform: translateX(300px)'
      );
      expect( getByTestId( 'canvas' ) ).toHaveStyle( 'transform: translateX(400px)' );
    };

    assertClosed();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertClosed();
  } );
} );
