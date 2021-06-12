import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class JiraExpressions {
  constructor(private client: Client) {}

  /**
   * Analyses and validates Jira expressions.
   *
   * As an experimental feature, this operation can also attempt to type-check the expressions.
   *
   * Learn more about Jira expressions in the
   * [documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required**: None.
   */
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(
    parameters: Parameters.AnalyseExpression | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Analyses and validates Jira expressions.
   *
   * As an experimental feature, this operation can also attempt to type-check the expressions.
   *
   * Learn more about Jira expressions in the
   * [documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required**: None.
   */
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(
    parameters?: Parameters.AnalyseExpression,
    callback?: never
  ): Promise<T>;
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(
    parameters?: Parameters.AnalyseExpression,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/expression/analyse',
      method: 'POST',
      params: {
        check: parameters?.check,
      },
      data: {
        expressions: parameters?.expressions,
        contextVariables: parameters?.contextVariables,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.jiraExpressions.analyseExpression' });
  }

  /**
   * Evaluates a Jira expression and returns its value.
   *
   * This resource can be used to test Jira expressions that you plan to use elsewhere, or to fetch data in a flexible
   * way. Consult the [Jira expressions
   * documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/) for more details.
   *
   * #### Context variables
   *
   * The following context variables are available to Jira expressions evaluated by this resource. Their presence
   * depends on various factors; usually you need to manually request them in the context object sent in the payload,
   * but some of them are added automatically under certain conditions.
   *
   * - `user` ([User](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)): The
   *   current user. Always available and equal to `null` if the request is anonymous.
   * - `app` ([App](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)): The Connect
   *   app that made the request. Available only for authenticated requests made by Connect Apps (read more here:
   *   [Authentication for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).
   * - `issue` ([Issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): The
   *   current issue. Available only when the issue is provided in the request context object.
   * - `issues` ([List](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list) of
   *   [Issues](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): A
   *   collection of issues matching a JQL query. Available only when JQL is provided in the request context object.
   * - `project` ([Project](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)):
   *   The current project. Available only when the project is provided in the request context object.
   * - `sprint` ([Sprint](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)):
   *   The current sprint. Available only when the sprint is provided in the request context object.
   * - `board` ([Board](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)): The
   *   current board. Available only when the board is provided in the request context object.
   * - `serviceDesk`
   *   ([ServiceDesk](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)):
   *   The current service desk. Available only when the service desk is provided in the request context object.
   * - `customerRequest`
   *   ([CustomerRequest](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)):
   *   The current customer request. Available only when the customer request is provided in the request context object.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required**: None.
   * However, an expression may return different results for different users depending on their permissions. For
   * example, different users may see different comments on the same issue. Permission to access Jira Software is
   * required to access Jira Software context variables (`board` and `sprint`) or fields (for example, `issue.sprint`).
   */
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(
    parameters: Parameters.EvaluateJiraExpression | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Evaluates a Jira expression and returns its value.
   *
   * This resource can be used to test Jira expressions that you plan to use elsewhere, or to fetch data in a flexible
   * way. Consult the [Jira expressions
   * documentation](https://developer.atlassian.com/cloud/jira/platform/jira-expressions/) for more details.
   *
   * #### Context variables
   *
   * The following context variables are available to Jira expressions evaluated by this resource. Their presence
   * depends on various factors; usually you need to manually request them in the context object sent in the payload,
   * but some of them are added automatically under certain conditions.
   *
   * - `user` ([User](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#user)): The
   *   current user. Always available and equal to `null` if the request is anonymous.
   * - `app` ([App](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#app)): The Connect
   *   app that made the request. Available only for authenticated requests made by Connect Apps (read more here:
   *   [Authentication for Connect apps](https://developer.atlassian.com/cloud/jira/platform/security-for-connect-apps/)).
   * - `issue` ([Issue](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): The
   *   current issue. Available only when the issue is provided in the request context object.
   * - `issues` ([List](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#list) of
   *   [Issues](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#issue)): A
   *   collection of issues matching a JQL query. Available only when JQL is provided in the request context object.
   * - `project` ([Project](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#project)):
   *   The current project. Available only when the project is provided in the request context object.
   * - `sprint` ([Sprint](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#sprint)):
   *   The current sprint. Available only when the sprint is provided in the request context object.
   * - `board` ([Board](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#board)): The
   *   current board. Available only when the board is provided in the request context object.
   * - `serviceDesk`
   *   ([ServiceDesk](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#servicedesk)):
   *   The current service desk. Available only when the service desk is provided in the request context object.
   * - `customerRequest`
   *   ([CustomerRequest](https://developer.atlassian.com/cloud/jira/platform/jira-expressions-type-reference#customerrequest)):
   *   The current customer request. Available only when the customer request is provided in the request context object.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required**: None.
   * However, an expression may return different results for different users depending on their permissions. For
   * example, different users may see different comments on the same issue. Permission to access Jira Software is
   * required to access Jira Software context variables (`board` and `sprint`) or fields (for example, `issue.sprint`).
   */
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(
    parameters?: Parameters.EvaluateJiraExpression,
    callback?: never
  ): Promise<T>;
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(
    parameters?: Parameters.EvaluateJiraExpression,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/expression/eval',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        expression: parameters?.expression,
        context: parameters?.context,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.jiraExpressions.evaluateJiraExpression' });
  }
}
