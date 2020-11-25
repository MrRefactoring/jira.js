import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowTransitionRules {
    constructor(private client: Client) { }
    async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowTransitionRuleConfigurations<T = Models.PageBeanWorkflowTransitionRules>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflow/rule/config",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorkflowTransitionRuleConfigurations<T = Models.WorkflowTransitionRulesUpdateErrors>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflow/rule/config",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}