import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcRoot = resolve(__dirname, 'src');
const distRoot = resolve(__dirname, 'dist');

export default defineConfig({
  plugins: [externalizeDeps()],
  resolve: {
    alias: {
      '#/': `${srcRoot}/`,
    },
  },
  build: {
    ssr: true,
    copyPublicDir: false,
    emptyOutDir: true,
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rolldownOptions: {
      output: [
        {
          format: 'es',
          dir: distRoot,
          entryFileNames: '[name].js',
          chunkFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: srcRoot,
        },
        {
          format: 'cjs',
          dir: distRoot,
          entryFileNames: '[name].cjs',
          chunkFileNames: '[name].cjs',
          exports: 'auto',
          preserveModules: true,
          preserveModulesRoot: srcRoot,
        },
      ],
    },
  },
});
