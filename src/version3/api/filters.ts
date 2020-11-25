import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Filters {
    constructor(private client: Client) { }
    async getFilters<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFilters<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getFilters<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createFilter<T = Models.Filter>(parameters: any, callback: Callback<T>): Promise<void>;
    async createFilter<T = Models.Filter>(parameters: any, callback?: undefined): Promise<T>;
    async createFilter<T = Models.Filter>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFavouriteFilters<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFavouriteFilters<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getFavouriteFilters<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter/favourite",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getMyFilters<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getMyFilters<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getMyFilters<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter/my",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters: any, callback?: undefined): Promise<T>;
    async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFilter<T = Models.Filter>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFilter<T = Models.Filter>(parameters: any, callback?: undefined): Promise<T>;
    async getFilter<T = Models.Filter>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateFilter<T = Models.Filter>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateFilter<T = Models.Filter>(parameters: any, callback?: undefined): Promise<T>;
    async updateFilter<T = Models.Filter>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteFilter<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteFilter<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteFilter<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/columns`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/columns`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async resetColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async resetColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async resetColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/columns`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setFavouriteForFilter<T = Models.Filter>(parameters: any, callback: Callback<T>): Promise<void>;
    async setFavouriteForFilter<T = Models.Filter>(parameters: any, callback?: undefined): Promise<T>;
    async setFavouriteForFilter<T = Models.Filter>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/favourite`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteFavouriteForFilter<T = Models.Filter>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteFavouriteForFilter<T = Models.Filter>(parameters: any, callback?: undefined): Promise<T>;
    async deleteFavouriteForFilter<T = Models.Filter>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/favourite`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}