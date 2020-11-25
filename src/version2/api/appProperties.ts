import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class AppProperties {
    constructor(private client: Client) { }
    async AddonPropertiesResource.getAddonProperties_get<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async AddonPropertiesResource.getAddonProperties_get<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async AddonPropertiesResource.getAddonProperties_get<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async AddonPropertiesResource.getAddonProperty_get<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async AddonPropertiesResource.getAddonProperty_get<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async AddonPropertiesResource.getAddonProperty_get<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async AddonPropertiesResource.putAddonProperty_put<T = Models.OperationMessage>(parameters: any, callback: Callback<T>): Promise<void>;
    async AddonPropertiesResource.putAddonProperty_put<T = Models.OperationMessage>(parameters: any, callback?: undefined): Promise<T>;
    async AddonPropertiesResource.putAddonProperty_put<T = Models.OperationMessage>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async AddonPropertiesResource.deleteAddonProperty_delete<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async AddonPropertiesResource.deleteAddonProperty_delete<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async AddonPropertiesResource.deleteAddonProperty_delete<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/atlassian-connect/1/addons/${parameters.addonKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}