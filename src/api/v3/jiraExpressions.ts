import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { JiraExpressionsAnalysis as JiraExpressionsAnalysisResponse, JiraExpressionResult as JiraExpressionResultResponse } from '../../models/v3';

export class JiraExpressions {
  constructor(private readonly client: Client) { }

  async analyseExpression(parameters?: {
    check?: string;
  }, callback?: Callback<JiraExpressionsAnalysisResponse>): Promise<JiraExpressionsAnalysisResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/expression/analyse',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async evaluateJiraExpression(parameters?: {
    expand?: string;
  }, callback?: Callback<JiraExpressionResultResponse>): Promise<JiraExpressionResultResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/expression/eval',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
