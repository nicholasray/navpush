#!/usr/bin/env node

const glob = require( 'glob' );
const fs = require( 'fs' );
const path = require( 'path' );
const pascal = require( 'camelcase' );
const { Bundler } = require( 'scss-bundle' );
const atImport = require( 'postcss-easy-import' );
const precss = require( 'precss' );
const namespace = require( 'postcss-namespace' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const postcss = require( 'postcss' );
const promises = [];

// add @prefix rule to top of css ast so that postcss-namespace can work
const addPrefixRule = postcss.plugin( 'postcss-add-prefix-rule', opts => {
  return root => {
    root.nodes[0].before( `@prefix ${opts.prefix}` );
  };
} );

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
    addPrefixRule( { prefix: 'NP' } ),
    namespace( { token: '-' } ),
    autoprefixer(),
    cssnano()
  ] ).process( css, { from: input, to: outFile } );

  return writeFile( outFile, result.css );
}

async function buildScss( input, outFile ) {
  outFile = outFile + '.module.scss';

  const bundler = new Bundler( undefined, __dirname );
  // Relative file path to project directory path.
  const result = await bundler.Bundle( input );

  return writeFile( outFile, result.bundledContent );
}

function buildStrategies() {
  const stylesheets = glob.sync( 'src/strategy/*/*/styles.module.scss' );
  const promises = [];

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

  return Promise.all( promises );
}

function buildHamburger() {
  const Hamburger = 'src/Hamburger/styles.module.scss';
  const dest = 'dist/styles/Hamburger';

  return Promise.all( [ buildCss( Hamburger, dest ), buildScss( Hamburger, dest ) ] );
}

function init() {
  promises.push( buildStrategies() );
  promises.push( buildHamburger() );

  Promise.all( promises ).then(
    () => {
      console.log( 'styles created' );
    },
    err => {
      console.error( err );
      process.exit( 1 );
    }
  );
}

init();
