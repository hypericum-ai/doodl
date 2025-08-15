import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
  input: './index.ts',
  output: {
    file: './dist/doodlchart.min.js',
    format: 'iife', 
    name: 'Doodl',
  },
  plugins: [
    resolve(),
    typescript(),
    terser({ format: { comments: false } })
  ]
};