import { defineConfig } from 'vite';

/**
 * The self-contained browser build.
 *
 * `dist/index.js` imports `zod` by bare specifier, which a browser cannot resolve on its own. CDNs that rewrite
 * dependencies (esm.sh, jsDelivr's `+esm`) handle that; serving the files as they are does not. This bundle inlines zod
 * so the package also loads from a plain file host or a `<script type="module">`.
 *
 * It builds from `dist`, not from `src`, so what ships is the same code the type checker and tests ran against rather
 * than a second compilation with its own settings.
 */
export default defineConfig({
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'oxc',
    sourcemap: true,
    lib: {
      entry: 'dist/index.js',
      formats: ['es'],
      fileName: () => 'browser.js',
    },
    rolldownOptions: {
      external: [],
      output: { codeSplitting: false, keepNames: true },
    },
  },
});
