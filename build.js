#!/usr/bin/env node

const glob = require( 'glob' );
const fs = require( 'fs' );
const path = require( 'path' );
const pascal = require( 'camelcase' );
const { Bundler } = require( 'scss-bundle' );
const atImport = require( 'postcss-easy-import' );
const postcss = require( 'postcss' );
const autoprefixer = require( 'autoprefixer' );
const precss = require( 'precss' );
const cssnano = require( 'cssnano' );
const stylesheets = glob.sync( 'src/strategy/*/*/styles.module.scss' );
const promises = [];

function writeFile( outFile, content ) {
  return fs.promises.mkdir( path.dirname( outFile ) ).then(
    () => {
      fs.promises.writeFile( outFile, content );
    },
    err => {
      if ( err && err.code === 'EEXIST' ) {
        return fs.promises.writeFile( outFile, content );
      }

      throw err;
    }
  );
}

function buildCss( input, outFile ) {
  outFile = outFile + '.min.css';

  return fs.promises.readFile( input ).then( css => {
    return postcss( [ atImport(), precss(), autoprefixer(), cssnano() ] )
      .process( css, { from: input, to: outFile } )
      .then( result => {
        return writeFile( outFile, result.css );
      } );
  } );
}

function buildScss( input, outFile ) {
  outFile = outFile + '.scss';

  const bundler = new Bundler( undefined, __dirname );
  // Relative file path to project directory path.
  return bundler.Bundle( input ).then( result => {
    return writeFile( outFile, result.bundledContent );
  } );
}

stylesheets.forEach( stylesheet => {
  const parts = stylesheet.split( path.sep );
  const outFile = path.join(
    'dist',
    'styles',
    pascal( [ parts[2], parts[3] ], { pascalCase: true } )
  );

  promises.push( buildCss( stylesheet, outFile ) );
  promises.push( buildScss( stylesheet, outFile ) );
} );

Promise.all( promises ).then(
  () => {
    console.log( 'styles created' );
  },
  err => {
    console.error( err );
    process.exit( 1 );
  }
);
