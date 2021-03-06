module.exports = {
  extends: ['standard'],
  plugins: ['standard', 'react'],
  rules: {
    semi: [2, 'always'],
    'no-var': 'error', // optional, recommended when using es6+
    'no-unused-vars': 1, // recommended
    'arrow-spacing': ['error', { before: true, after: true }], // recommended
    indent: ['error', 2],
    'comma-dangle': [
      'error',
      {
        objects: 'only-multiline',
        arrays: 'only-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'space-in-parens': ['error', 'always'],
    'array-bracket-spacing': ['error', 'always'],

    // standard.js
    'space-before-function-paren': [
      'error',
      {
        named: 'never',
        anonymous: 'always',
        asyncArrow: 'always'
      }
    ],

    // standard plugin - options
    'standard/object-curly-even-spacing': ['error', 'either'],
    'standard/array-bracket-even-spacing': ['error', 'either'],
    'standard/computed-property-even-spacing': ['error', 'even'],
    'standard/no-callback-literal': ['error', ['cb', 'callback']],

    // react plugin - options
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-curly-spacing': ['error', 'always']
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 8 // optional, recommended 6+
  }
};
