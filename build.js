#!/usr/bin/env node

const glob = require( 'glob' );
const fs = require( 'fs' );
const path = require( 'path' );
const pascal = require( 'camelcase' );
const { Bundler } = require( 'scss-bundle' );
const atImport = require( 'postcss-easy-import' );
const precss = require( 'precss' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const postcss = require( 'postcss' );
const stylesheets = glob.sync( 'src/strategy/*/*/styles.module.scss' );
const promises = [];

async function writeFile( outFile, content ) {
  try {
    await fs.promises.mkdir( path.dirname( outFile ) );
  } catch ( err ) {
    if ( err && err.code === 'EEXIST' ) {
      return fs.promises.writeFile( outFile, content );
    }

    throw err;
  }

  return fs.promises.writeFile( outFile, content );
}

async function buildCss( input, outFile ) {
  outFile = outFile + '.min.css';

  const css = await fs.promises.readFile( input );
  const result = await postcss( [
    atImport(),
    precss(),
    autoprefixer(),
    cssnano()
  ] ).process( css, { from: input, to: outFile } );

  return writeFile( outFile, result.css );
}

async function buildScss( input, outFile ) {
  outFile = outFile + '.scss';

  const bundler = new Bundler( undefined, __dirname );
  // Relative file path to project directory path.
  const result = await bundler.Bundle( input );

  return writeFile( outFile, result.bundledContent );
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
