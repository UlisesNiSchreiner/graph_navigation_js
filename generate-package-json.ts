import { writeFileSync } from 'fs';
import { resolve } from 'path';
import packageJson from './package.json';

const distPackageJson = {
  ...packageJson,
  main: './index.js',
  typings: './index.d.ts',
  scripts: undefined,
  devDependencies: undefined,
};

const distPackageJsonPath = resolve(__dirname, 'dist/package.json');
writeFileSync(distPackageJsonPath, JSON.stringify(distPackageJson, null, 2));
