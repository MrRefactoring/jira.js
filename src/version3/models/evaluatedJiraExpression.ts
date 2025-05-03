import type { EvaluateMetaData } from './evaluateMetaData';

/**
 * The result of evaluating a Jira expression.This bean will be replacing `JiraExpressionResultBean` bean as part of new
 * evaluate endpoint
 */
export interface EvaluatedJiraExpression {
  meta?: EvaluateMetaData;
  /**
   * The value of the evaluated expression. It may be a primitive JSON value or a Jira REST API object. (Some
   * expressions do not produce any meaningful results—for example, an expression that returns a lambda function—if
   * that's the case a simple string representation is returned. These string representations should not be relied upon
   * and may change without notice.)
   */
  value: unknown;
}
