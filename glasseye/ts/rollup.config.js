import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import terser from '@rollup/plugin-terser';

export default {
  input: './index.ts',
  output: {
    file: './dist/glasseyechart.js',
    format: 'iife', 
    name: 'Glasseye',
  },
  plugins: [
    resolve(),
    typescript(),
    // terser({ format: { comments: false } })
  ]
};