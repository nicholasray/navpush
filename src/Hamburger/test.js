import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Hamburger from './index';

afterEach( cleanup );

test( 'renders default className and keeps className after click', () => {
  const { getByTestId } = render(
    <Hamburger onClick={ () => {} } attrs={ { 'data-testid': 'hamburger' } } />
  );

  expect( getByTestId( 'hamburger' ) ).toHaveClass( 'NP-Hamburger' );

  fireEvent.click( getByTestId( 'hamburger' ) );

  expect( getByTestId( 'hamburger' ) ).toHaveClass( 'NP-Hamburger' );
} );
