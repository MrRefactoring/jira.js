/**
 * Details about the complexity of the analysed Jira expression. */
export interface JiraExpressionComplexity {
  /** Information that can be used to determine how many [expensive operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) the evaluation of the expression will perform. This information may be a formula or number. For example:

   *  `issues.map(i => i.comments)` performs as many expensive operations as there are issues on the issues list. So this parameter returns `N`, where `N` is the size of issue list.
   *  `new Issue(10010).comments` gets comments for one issue, so its complexity is `2` (`1` to retrieve issue 10010 from the database plus `1` to get its comments). */
  expensiveOperations: string;
  /** Variables used in the formula, mapped to the parts of the expression they refer to. */
  variables?: {};
}
