/**
 * An operand that is a JQL keyword. See [Advanced searching - keywords
 * reference](https://confluence.atlassian.com/jiracorecloud/advanced-searching-keywords-reference-765593717.html#Advancedsearching-keywordsreference-EMPTYEMPTY)
 * for more information about operand keywords.
 */
export interface KeywordOperand {
  /** The keyword that is the operand value. */
  keyword: string;
}
