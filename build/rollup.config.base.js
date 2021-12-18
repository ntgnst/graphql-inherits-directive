import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import excludeDependencies from 'rollup-plugin-exclude-dependencies-from-bundle';

const config = require('../package.json');

export default {
  input: 'src/index.js',
  plugins: [
    resolve({
      'jsnext:main': true,
      'mainFields:main': true,
      preferBuiltins: true,
      browser: true,
    }),
    cjs({
      exclude: 'src/**',
    }),
    replace({
      VERSION: JSON.stringify(config.version),
      preventAssignment: true,
    }),
    json({
      compact: true,
    }),
    excludeDependencies({
      dependencies: true,
      peerDependencies: true,
    }),
  ],
};
