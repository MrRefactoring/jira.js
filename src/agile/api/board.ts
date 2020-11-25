import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Board {
    constructor(private client: Client) { }
    async getAllBoards<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllBoards<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllBoards<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/board",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/board",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoardByFilterId<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoardByFilterId<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoardByFilterId<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/filter/${parameters.filterId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/backlog`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getConfiguration<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getConfiguration<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getConfiguration<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/configuration`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getEpics<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getEpics<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getEpics<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/epic`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuesWithoutEpicForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesWithoutEpicForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesWithoutEpicForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoardIssuesForEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoardIssuesForEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoardIssuesForEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFeaturesForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFeaturesForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getFeaturesForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/features`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async toggleFeatures<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async toggleFeatures<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async toggleFeatures<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/features`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveIssuesToBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveIssuesToBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async moveIssuesToBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/issue`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjects<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjects<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjects<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/project`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectsFull<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectsFull<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectsFull<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/project/full`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoardPropertyKeys<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoardPropertyKeys<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoardPropertyKeys<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoardProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoardProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoardProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setBoardProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setBoardProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setBoardProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteBoardProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteBoardProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteBoardProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllQuickFilters<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllQuickFilters<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllQuickFilters<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/quickfilter`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getQuickFilter<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getQuickFilter<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getQuickFilter<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getReportsForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getReportsForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getReportsForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/reports`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllSprints<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllSprints<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllSprints<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/sprint`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBoardIssuesForSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBoardIssuesForSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBoardIssuesForSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllVersions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllVersions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllVersions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/board/${parameters.boardId}/version`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}