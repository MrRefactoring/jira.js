/**The JQL specifying the issues available in the evaluated Jira expression under the `issues` context variable.*/
export interface JexpIssues {
    /**The JQL query that specifies the set of issues available in the Jira expression.*/
    jql?: JexpJqlIssues[];
}