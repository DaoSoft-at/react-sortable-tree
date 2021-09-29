import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace'

import pkg from './package.json';

import { terser } from 'rollup-plugin-terser';

const globals = {
  'react': 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  'react-dnd': 'ReactDnD',
  'react-dnd-html5-backend': 'ReactDnDHtml5Backend',
  'lodash.isequal': 'isEqual',
  'react-virtualized': 'ReactVirtualized'
};

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'esm',
      exports: 'named',
    },
	{
      file: pkg.umd,
      format: 'umd',
	  name: 'react-sortable-tree',
      exports: 'named',
	  globals,
    },
	{
      file: pkg.umdmin,
      format: 'umd',
	  name: 'react-sortable-tree',
      exports: 'named',
	  plugins: [
		terser()
	  ],
	  globals,
    },
  ],
  external: [
    'react',
    'react-dom',
    'react-dnd',
    'prop-types',
    'react-dnd-html5-backend',
    //'frontend-collective-react-dnd-scrollzone',
    'react-virtualized',
    'lodash.isequal',
  ],
  plugins: [
    nodeResolve(),
    postcss({ extract: './style.css' }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
	replace({
	  'process.env.NODE_ENV': '"production"'
	}),
  ],
};
