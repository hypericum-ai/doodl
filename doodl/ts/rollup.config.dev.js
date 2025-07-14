import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './index.ts',
  output: {
    file: './dist/doodlchart.js',
    format: 'iife', 
    name: 'Doodl',
  },
  plugins: [
    resolve(),
    typescript()
  ]
};