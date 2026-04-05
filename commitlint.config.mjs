export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['base', 'cloud', 'agile', 'ci', 'deps', 'release', 'docs', 'scripts'],
    ],
    'body-max-line-length': [1, 'always', 120],
  },
};
