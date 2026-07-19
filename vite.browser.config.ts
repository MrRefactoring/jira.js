import { defineConfig } from 'vite';

/**
 * The self-contained browser build.
 *
 * `dist/index.js` imports `zod` by bare specifier, which a browser cannot resolve on its own. CDNs that rewrite
 * dependencies (esm.sh, jsDelivr's `+esm`) handle that; serving the files as they are does not. This bundle inlines
 * zod so the package also loads from a plain file host or a `<script type="module">`.
 *
 * It builds from `dist`, not from `src`, so what ships is the same code the type checker and tests ran against rather
 * than a second compilation with its own settings.
 */
export default defineConfig({
  // Minification otherwise renames the error classes, so `error.constructor.name`
  // reads as a single mangled letter in devtools and in logs. The predicates and
  // `error.name` survive regardless — they do not depend on the class identity —
  // but a stack trace nobody can read is a poor trade for a few hundred bytes.
  esbuild: { keepNames: true },
  build: {
    target: 'es2022',
    outDir: 'dist',
    emptyOutDir: false,
    minify: 'esbuild',
    sourcemap: true,
    lib: {
      entry: 'dist/index.js',
      formats: ['es'],
      fileName: () => 'browser.js',
    },
    rollupOptions: {
      // Nothing is external: that is the entire point of this artifact.
      external: [],
      output: { codeSplitting: false },
    },
  },
});
