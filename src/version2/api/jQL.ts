import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class JQL {
    constructor(private client: Client) { }
    async getAutoComplete<T = Models.JQLReferenceData>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAutoComplete<T = Models.JQLReferenceData>(parameters: any, callback?: undefined): Promise<T>;
    async getAutoComplete<T = Models.JQLReferenceData>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/jql/autocompletedata",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters: any, callback?: undefined): Promise<T>;
    async getFieldAutoCompleteForQueryString<T = Models.AutoCompleteSuggestions>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/jql/autocompletedata/suggestions",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters: any, callback: Callback<T>): Promise<void>;
    async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters: any, callback?: undefined): Promise<T>;
    async parseJqlQueries<T = Models.ParsedJqlQueries>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/jql/parse",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async migrateQueries<T = Models.ConvertedJQLQueries>(parameters: any, callback: Callback<T>): Promise<void>;
    async migrateQueries<T = Models.ConvertedJQLQueries>(parameters: any, callback?: undefined): Promise<T>;
    async migrateQueries<T = Models.ConvertedJQLQueries>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/jql/pdcleaner",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}