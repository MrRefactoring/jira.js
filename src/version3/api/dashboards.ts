import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Dashboards {
    constructor(private client: Client) { }
    async getAllDashboards<T = Models.PageOfDashboards>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllDashboards<T = Models.PageOfDashboards>(parameters: any, callback?: undefined): Promise<T>;
    async getAllDashboards<T = Models.PageOfDashboards>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/dashboard",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createDashboard<T = Models.Dashboard>(parameters: any, callback: Callback<T>): Promise<void>;
    async createDashboard<T = Models.Dashboard>(parameters: any, callback?: undefined): Promise<T>;
    async createDashboard<T = Models.Dashboard>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/dashboard",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters: any, callback?: undefined): Promise<T>;
    async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/dashboard/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDashboardItemProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDashboardItemProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getDashboardItemProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setDashboardItemProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setDashboardItemProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setDashboardItemProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDashboardItemProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDashboardItemProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDashboardItemProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDashboard<T = Models.Dashboard>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDashboard<T = Models.Dashboard>(parameters: any, callback?: undefined): Promise<T>;
    async getDashboard<T = Models.Dashboard>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateDashboard<T = Models.Dashboard>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateDashboard<T = Models.Dashboard>(parameters: any, callback?: undefined): Promise<T>;
    async updateDashboard<T = Models.Dashboard>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDashboard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDashboard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDashboard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async copyDashboard<T = Models.Dashboard>(parameters: any, callback: Callback<T>): Promise<void>;
    async copyDashboard<T = Models.Dashboard>(parameters: any, callback?: undefined): Promise<T>;
    async copyDashboard<T = Models.Dashboard>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/dashboard/${parameters.id}/copy`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}