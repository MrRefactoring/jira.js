import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class JiraExpressions {
    constructor(private client: Client) { }
    async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters: any, callback: Callback<T>): Promise<void>;
    async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters: any, callback?: undefined): Promise<T>;
    async analyseExpression<T = Models.JiraExpressionsAnalysis>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/expression/analyse",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters: any, callback: Callback<T>): Promise<void>;
    async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters: any, callback?: undefined): Promise<T>;
    async evaluateJiraExpression<T = Models.JiraExpressionResult>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/expression/eval",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}