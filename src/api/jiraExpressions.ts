import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class JiraExpressions {
  constructor(private readonly client: Sender) {}

  public async analyseJiraExpression(
    params: {
      check?: string;
      expressions: Array<string>;
      contextVariables?: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/expression/analyse',
      method: 'POST',
      params: {
        check: params?.check,
      },
      data: {
        expressions: params?.expressions,
        contextVariables: params?.contextVariables,
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
        expand: params?.expand,
      },
      data: {
        expression: params?.expression,
        context: params?.context,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
