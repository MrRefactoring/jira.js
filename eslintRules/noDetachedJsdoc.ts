import type { Rule } from 'eslint';

export const noDetachedJsdoc: Rule.RuleModule = {
  meta: {
    type: 'layout',
    docs: {
      description: 'Disallow a blank line between a JSDoc block and the declaration it documents',
    },
    fixable: 'whitespace',
    schema: [],
    messages: {
      detached: 'JSDoc must sit directly above the declaration it documents; remove the blank line.',
    },
  },
  create(context) {
    const { sourceCode } = context;

    return {
      Program() {
        for (const comment of sourceCode.getAllComments()) {
          if (comment.type !== 'Block' || !comment.value.startsWith('*')) continue;
          if (sourceCode.getTokenBefore(comment, { includeComments: true }) === null) continue;

          const next = sourceCode.getTokenAfter(comment, { includeComments: true });

          if (!next?.loc || !comment.loc || !comment.range || !next.range) continue;
          if (next.loc.start.line - comment.loc.end.line < 2) continue;

          const indent = ' '.repeat(next.loc.start.column);

          context.report({
            loc: comment.loc,
            messageId: 'detached',
            fix: fixer => fixer.replaceTextRange([comment.range![1], next.range![0]], `\n${indent}`),
          });
        }
      },
    };
  },
};
