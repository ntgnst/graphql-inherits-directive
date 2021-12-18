module.exports = {
  extends: ['airbnb-base'],
  plugins: ['import', 'node'],
  rules: {
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off', // temporary rule disable
    'linebreak-style': 'off',
    'no-constant-condition': 'off',
    'no-await-in-loop': 'off',
    'template-curly-spacing': 'off',
    indent: [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral'],
      },
    ],
    'max-len': ['error', 150, 2],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'switch' },
      { blankLine: 'always', prev: '*', next: 'for' },
      { blankLine: 'always', prev: '*', next: 'function' },
      { blankLine: 'always', prev: 'import', next: 'export' },
      { blankLine: 'always', prev: 'expression', next: 'export' },
      { blankLine: 'always', prev: 'import', next: 'expression' },
    ],
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  globals: {
    afterEach: false,
    describe: false,
    test: false,
    expect: false,
    jest: false,
    beforeAll: false,
    it: false,
    afterAll: false,
    beforeEach: false,
  },
};
