import base from './rollup.config.base';

const config = {
  ...base,
  output: {
    file: 'dist/graphql-utils.esm.js',
    format: 'es',
  },
};

export default config;
