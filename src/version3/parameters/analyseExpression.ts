import { JiraExpressionForAnalysis } from '../models';

export interface AnalyseExpression extends JiraExpressionForAnalysis {
  /**
   * The check to perform:
   *
   * `syntax` Each expression's syntax is checked to ensure the expression can be parsed. Also, syntactic limits are
   * validated. For example, the expression's length. `type` EXPERIMENTAL. Each expression is type checked and the final
   * type of the expression inferred. Any type errors that would result in the expression failure at runtime are
   * reported. For example, accessing properties that don't exist or passing the wrong number of arguments to functions.
   * Also performs the syntax check. `complexity` EXPERIMENTAL. Determines the formulae for how many [expensive
   * operations](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/#expensive-operations) each
   * expression may execute.
   */
  check?: string;
}
