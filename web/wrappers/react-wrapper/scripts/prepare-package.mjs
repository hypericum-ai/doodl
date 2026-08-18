import { copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist/doodl-ai-react');
const srcPkg = JSON.parse(
  readFileSync(resolve(root, 'projects/doodl-ai-react/package.json'), 'utf8'),
);

const distPkg = {
  name: srcPkg.name,
  version: srcPkg.version,
  description: srcPkg.description,
  license: srcPkg.license,
  repository: srcPkg.repository,
  sideEffects: false,
  type: 'module',
  main: './doodl-ai-react.cjs',
  module: './doodl-ai-react.js',
  types: './index.d.ts',
  exports: {
    '.': {
      types: './index.d.ts',
      import: './doodl-ai-react.js',
      require: './doodl-ai-react.cjs',
    },
  },
  peerDependencies: srcPkg.peerDependencies,
};

writeFileSync(resolve(dist, 'package.json'), `${JSON.stringify(distPkg, null, 2)}\n`);
copyFileSync(resolve(root, 'projects/doodl-ai-react/README.md'), resolve(dist, 'README.md'));
