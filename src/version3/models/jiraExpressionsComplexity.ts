import type { JiraExpressionsComplexityValue } from './jiraExpressionsComplexityValue.js';

export interface JiraExpressionsComplexity {
  steps?: JiraExpressionsComplexityValue;
  expensiveOperations?: JiraExpressionsComplexityValue;
  beans?: JiraExpressionsComplexityValue;
  primitiveValues?: JiraExpressionsComplexityValue;
}
