import { JiraExpressionsComplexityValueBean } from './jiraExpressionsComplexityValueBean';

export interface JiraExpressionsComplexityBean {
  steps?: JiraExpressionsComplexityValueBean;
  expensiveOperations?: JiraExpressionsComplexityValueBean;
  beans?: JiraExpressionsComplexityValueBean;
  primitiveValues?: JiraExpressionsComplexityValueBean;
}
