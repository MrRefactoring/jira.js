/* eslint-disable import/no-extraneous-dependencies */
import typescript from '@rollup/plugin-typescript';
import { defineConfig } from 'rollup';

const config = defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: './out/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './out/index.mjs',
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [typescript()],
  },
]);

export default config;
