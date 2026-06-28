import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esnextToNodeNext from 'rollup-plugin-esnext-to-nodenext';
import nodeExternals from 'rollup-plugin-node-externals';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      entryFileNames: '[name].mjs',
    },
    plugins: [
      nodeExternals(),
      resolve(),
      commonjs(),
      typescript({
        outDir: 'dist/esm',
        rootDir: 'src',
        declaration: true,
        declarationDir: 'dist/esm/types',
        tsconfig: './tsconfig.json',
      }),
      esnextToNodeNext()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      sourcemap: true,
      exports: 'auto',
      entryFileNames: '[name].cjs',
    },
    plugins: [
      nodeExternals(),
      resolve(),
      commonjs(),
      typescript({
        outDir: 'dist/cjs',
        rootDir: 'src',
        declaration: false,
        tsconfig: './tsconfig.json',
      }),
    ]
  }
]);
