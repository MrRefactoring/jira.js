import { JiraExpressionsComplexityValue } from './jiraExpressionsComplexityValue';

export interface JiraExpressionsComplexity {
  steps?: JiraExpressionsComplexityValue;
  expensiveOperations?: JiraExpressionsComplexityValue;
  beans?: JiraExpressionsComplexityValue;
  primitiveValues?: JiraExpressionsComplexityValue;
}
