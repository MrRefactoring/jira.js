import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * An operand that is a JQL keyword. See [Advanced searching - keywords
 * reference](https://confluence.atlassian.com/jiracorecloud/advanced-searching-keywords-reference-765593717.html#Advancedsearching-keywordsreference-EMPTYEMPTY)
 * for more information about operand keywords.
 */

export const KeywordOperandSchema = apiObject({
  /** The keyword that is the operand value. */
  keyword: openEnum(['empty']),
});

export type KeywordOperand = z.infer<typeof KeywordOperandSchema>;
