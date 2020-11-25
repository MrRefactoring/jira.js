export interface JiraExpressionEvalRequestBean {
    /**The Jira expression to evaluate.*/
    expression: string;
    /**The context in which the Jira expression is evaluated.*/
    context?: JiraExpressionEvalContextBean[];
}