import base from './rollup.config.base';

const config = {
  ...base,
  output: {
    file: 'dist/graphql-utils.umd.js',
    format: 'umd',
    name: '@piri/graphql-utils',
    extend: true,
    globals: {
      'apollo-server': 'apollo-server',
      ramda: 'ramda',
      'graphql/language': 'graphql',

    },
  },
};

export default config;
