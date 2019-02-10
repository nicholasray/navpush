import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from '../Hamburger';
import setup from './index';
import Sidebar from '../Sidebar';
import Header from '../Header';
let props;

beforeEach( () => {
  props = {
    attrs: { 'data-testid': 'np' },
    header: ( isOpen, toggle ) => (
      <div>
        <div>Nav content</div>
        <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
      </div>
    ),
    headerAttrs: { 'data-testid': 'header' },
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
      expect( getByTestId( 'header' ) ).toHaveClass( 'NP-Header' );

      expect( getByTestId( 'np' ) ).not.toHaveClass( 'NP-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).not.toHaveClass( 'NP-Overlay--open' );
      expect( getByTestId( 'canvas' ) ).not.toHaveClass( 'NP-Canvas--open' );
      expect( getByTestId( 'sidebar' ) ).not.toHaveClass( 'NP-Sidebar--open' );
      expect( getByTestId( 'header' ) ).not.toHaveClass( 'NP-Header--open' );
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
      expect( getByTestId( 'header' ) ).toHaveClass( 'NP-Header', 'NP-Header--open' );
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
      Header: 'Foo-Header',
      'Header--open': 'Foo-Header--open'
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
      expect( getByTestId( 'header' ) ).toHaveClass( 'Foo-Header' );

      expect( getByTestId( 'np' ) ).not.toHaveClass( 'Foo-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).not.toHaveClass( 'Foo-Overlay--open' );
      expect( getByTestId( 'canvas' ) ).not.toHaveClass( 'Foo-Canvas--open' );
      expect( getByTestId( 'sidebar' ) ).not.toHaveClass( 'Foo-Sidebar--open' );
      expect( getByTestId( 'header' ) ).not.toHaveClass( 'Foo-Header--open' );
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
      expect( getByTestId( 'header' ) ).toHaveClass( 'Foo-Header', 'Foo-Header--open' );
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
  it( 'overlay is still clickable', () => {
    const NavPush = setup( {
      direction: 'foo'
    } );
    const { getByTestId, container } = render(
      <NavPush { ...props } dim={ false }>
        <div>body</div>
      </NavPush>
    );
    const assertOpen = () => {
      expect( getByTestId( 'sidebar' ) ).toHaveClass(
        'NP-Sidebar',
        'NP-Sidebar--open'
      );
    };
    const assertClosed = () => {
      expect( container.querySelector( '.NP-Overlay' ) ).toBeInTheDocument();
      expect( getByTestId( 'sidebar' ) ).toHaveClass( 'NP-Sidebar' );
      expect( getByTestId( 'sidebar' ) ).not.toHaveClass( 'NP-Sidebar--open' );
    };

    assertClosed();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'overlay' ) );
    assertClosed();
  } );
} );

describe( 'when strategy includes inline styles', () => {
  it( 'renders inline styles', () => {
    const passedProps = props;
    const NavPush = setup( {
      direction: 'foo',
      header: {
        getStyles( { sidebar, header, props, isOpen } ) {
          if ( !isOpen ) {
            expect( sidebar ).toBeInstanceOf( Sidebar );
            expect( header ).toBeInstanceOf( Header );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(10px)`
            };
          }

          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( header ).toBeInstanceOf( Header );
          expect( props ).toMatchObject( passedProps );

          return {
            transform: `translateX(100px)`
          };
        }
      },
      sidebar: {
        getStyles( { sidebar, header, props, isOpen } ) {
          if ( !isOpen ) {
            expect( sidebar ).toBeInstanceOf( Sidebar );
            expect( header ).toBeInstanceOf( Header );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(20px)`
            };
          }

          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( header ).toBeInstanceOf( Header );
          expect( props ).toMatchObject( passedProps );

          return {
            transform: `translateX(200px)`
          };
        }
      },
      overlay: {
        getStyles( { sidebar, header, props, isOpen } ) {
          if ( !isOpen ) {
            expect( sidebar ).toBeInstanceOf( Sidebar );
            expect( header ).toBeInstanceOf( Header );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(30px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( header ).toBeInstanceOf( Header );

          return {
            transform: `translateX(300px)`
          };
        }
      },
      canvas: {
        getStyles( { sidebar, header, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(40px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( sidebar ).toBeInstanceOf( Sidebar );
          expect( header ).toBeInstanceOf( Header );

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
      expect( getByTestId( 'header' ) ).toHaveStyle( 'transform: translateX(10px)' );
      expect( getByTestId( 'sidebar' ) ).toHaveStyle( 'transform: translateX(20px)' );
      expect( getByTestId( 'overlay' ) ).toHaveStyle( 'transform: translateX(30px)' );
      expect( getByTestId( 'canvas' ) ).toHaveStyle( 'transform: translateX(40px)' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'header' ) ).toHaveStyle( 'transform: translateX(100px)' );
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
