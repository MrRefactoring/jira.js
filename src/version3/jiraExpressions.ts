import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class JiraExpressions {
  constructor(private client: Client) { }
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters?: Parameters.AnalyseExpression, callback?: Callback<T>): Promise<void>;
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters?: Parameters.AnalyseExpression, callback?: undefined): Promise<T>;
  async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters?: Parameters.AnalyseExpression, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/expression/analyse',
      method: 'POST',
      params: {
        check: parameters?.check,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters?: Parameters.EvaluateJiraExpression, callback?: Callback<T>): Promise<void>;
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters?: Parameters.EvaluateJiraExpression, callback?: undefined): Promise<T>;
  async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters?: Parameters.EvaluateJiraExpression, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/expression/eval',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
