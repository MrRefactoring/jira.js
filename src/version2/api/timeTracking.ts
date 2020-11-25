import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class TimeTracking {
    constructor(private client: Client) { }
    async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(parameters: any, callback?: undefined): Promise<T>;
    async getSelectedTimeTrackingImplementation<T = Models.TimeTrackingProvider>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/configuration/timetracking",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async selectTimeTrackingImplementation<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async selectTimeTrackingImplementation<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async selectTimeTrackingImplementation<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/configuration/timetracking",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAvailableTimeTrackingImplementations<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAvailableTimeTrackingImplementations<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAvailableTimeTrackingImplementations<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/configuration/timetracking/list",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback?: undefined): Promise<T>;
    async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/configuration/timetracking/options",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback: Callback<T>): Promise<void>;
    async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback?: undefined): Promise<T>;
    async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/configuration/timetracking/options",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}