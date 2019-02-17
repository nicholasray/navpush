import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from '../../Hamburger';
import setup from '../../Factory';
import Nav from '../../Nav';
import OnCanvas from './index';
let props;

beforeEach( () => {
  props = {
    attrs: { 'data-testid': 'np' },
    nav: () => <div>Nav content</div>,
    navAttrs: { 'data-testid': 'nav' },
    overlayAttrs: { 'data-testid': 'overlay' },
  };
} );
afterEach( cleanup );

describe( 'when theme is not passed', () => {
  it( 'renders default classnames when opened and closed', () => {
    const NavPush = setup( {
      direction: 'foo',
      renderer: OnCanvas
    } );
    const { getByTestId } = render(
      <NavPush { ...props }>
        {( isOpen, toggle ) => (
          <div>
            <div>Nav content</div>
            <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
          </div>
        )}
      </NavPush>
    );
    const assertClosed = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'NP-NavPush' );
      expect( getByTestId( 'overlay' ) ).toHaveClass( 'NP-Overlay' );
      expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav' );

      expect( getByTestId( 'np' ) ).not.toHaveClass( 'NP-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).not.toHaveClass( 'NP-Overlay--open' );
      expect( getByTestId( 'nav' ) ).not.toHaveClass( 'NP-Nav--open' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'NP-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).toHaveClass(
        'NP-Overlay',
        'NP-Overlay--open'
      );
      expect( getByTestId( 'nav' ) ).toHaveClass(
        'NP-Nav',
        'NP-Nav--open'
      );
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
      direction: 'foo',
      renderer: OnCanvas
    } );
    const theme = {
      NavPush: 'Foo-NavPush',
      'NavPush--open': 'Foo-NavPush--open',
      Overlay: 'Foo-Overlay',
      'Overlay--open': 'Foo-Overlay--open',
      Nav: 'Foo-Nav',
      'Nav--open': 'Foo-Nav--open',
    };
    const { getByTestId } = render(
      <NavPush { ...props } theme={ theme }>
        {( isOpen, toggle ) => (
          <div>
            <div>Nav content</div>
            <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
          </div>
        )}
      </NavPush>
    );

    const assertClosed = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush' );
      expect( getByTestId( 'overlay' ) ).toHaveClass( 'Foo-Overlay' );
      expect( getByTestId( 'nav' ) ).toHaveClass( 'Foo-Nav' );

      expect( getByTestId( 'np' ) ).not.toHaveClass( 'Foo-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).not.toHaveClass( 'Foo-Overlay--open' );
      expect( getByTestId( 'nav' ) ).not.toHaveClass( 'Foo-Nav--open' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'np' ) ).toHaveClass( 'Foo-NavPush--open' );
      expect( getByTestId( 'overlay' ) ).toHaveClass(
        'Foo-Overlay',
        'Foo-Overlay--open'
      );
      expect( getByTestId( 'nav' ) ).toHaveClass(
        'Foo-Nav',
        'Foo-Nav--open'
      );
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
      direction: 'foo',
      renderer: OnCanvas
    } );
    const { getByTestId, container } = render(
      <NavPush { ...props } dim={ false }>
        {( isOpen, toggle ) => (
          <div>
            <div>Nav content</div>
            <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
          </div>
        )}
      </NavPush>
    );
    const assertOpen = () => {
      expect( getByTestId( 'nav' ) ).toHaveClass(
        'NP-Nav',
        'NP-Nav--open'
      );
    };
    const assertClosed = () => {
      expect( container.querySelector( '.NP-Overlay' ) ).toBeInTheDocument();
      expect( getByTestId( 'nav' ) ).toHaveClass( 'NP-Nav' );
      expect( getByTestId( 'nav' ) ).not.toHaveClass( 'NP-Nav--open' );
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
      renderer: OnCanvas,
      fixbox: {
        getStyles( { nav, fixbox, props, isOpen } ) {
          if ( !isOpen ) {
            expect( nav ).toBeInstanceOf( Nav );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(10px)`
            };
          }

          expect( nav ).toBeInstanceOf( Nav );
          expect( props ).toMatchObject( passedProps );

          return {
            transform: `translateX(100px)`
          };
        }
      },
      nav: {
        getStyles( { nav, fixbox, props, isOpen } ) {
          if ( !isOpen ) {
            expect( nav ).toBeInstanceOf( Nav );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(20px)`
            };
          }

          expect( nav ).toBeInstanceOf( Nav );
          expect( props ).toMatchObject( passedProps );

          return {
            transform: `translateX(200px)`
          };
        }
      },
      overlay: {
        getStyles( { nav, fixbox, props, isOpen } ) {
          if ( !isOpen ) {
            expect( nav ).toBeInstanceOf( Nav );
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(30px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(300px)`
          };
        }
      },
      canvas: {
        getStyles( { nav, fixbox, props, isOpen } ) {
          if ( !isOpen ) {
            expect( props ).toMatchObject( passedProps );

            return {
              transform: `translateX(40px)`
            };
          }

          expect( props ).toMatchObject( passedProps );
          expect( nav ).toBeInstanceOf( Nav );

          return {
            transform: `translateX(400px)`
          };
        }
      }
    } );
    const { getByTestId } = render(
      <NavPush { ...props }>
        {( isOpen, toggle ) => (
          <div>
            <div>Nav content</div>
            <Hamburger onClick={ toggle } attrs={ { 'data-testid': 'hamburger' } } />
          </div>
        )}
      </NavPush>
    );

    const assertClosed = () => {
      expect( getByTestId( 'nav' ) ).toHaveStyle( 'transform: translateX(20px)' );
      expect( getByTestId( 'overlay' ) ).toHaveStyle( 'transform: translateX(30px)' );
    };

    const assertOpen = () => {
      expect( getByTestId( 'nav' ) ).toHaveStyle(
        'transform: translateX(200px)'
      );
    };

    assertClosed();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertOpen();
    fireEvent.click( getByTestId( 'hamburger' ) );
    assertClosed();
  } );
} );
