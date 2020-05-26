import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class JiraExpressions {
  constructor(private readonly client: Sender) { }

  public async analyseJiraExpression(
    params: {
      expressions: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/expression/analyse',
      method: 'POST',
      data: {
        expressions: params.expressions,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async evaluateJiraExpression(
    params: {
      expand?: string;
      expression: string;
      context?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/expression/eval',
      method: 'POST',
      params: {
        expand: params.expand,
      },
      data: {
        expression: params.expression,
        context: params.context,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
