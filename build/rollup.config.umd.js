import base from './rollup.config.base';

const config = {
  ...base,
  output: {
    file: 'dist/graphql-inherits-directive.umd.js',
    format: 'umd',
    name: 'graphql-inherits-directive',
    extend: true,
    globals: {
      'apollo-server': 'apollo-server',
      ramda: 'ramda',
      'graphql/language': 'graphql',

    },
  },
};

export default config;
