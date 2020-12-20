import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Board {
  constructor(private client: Client) { }
  async getAllBoards<T = any>(parameters?: Parameters.GetAllBoards, callback?: Callback<T>): Promise<void>;
  async getAllBoards<T = any>(parameters?: Parameters.GetAllBoards, callback?: undefined): Promise<T>;
  async getAllBoards<T = any>(parameters?: Parameters.GetAllBoards, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/board',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        type: parameters?.type,
        name: parameters?.name,
        projectKeyOrId: parameters?.projectKeyOrId,
        accountIdLocation: parameters?.accountIdLocation,
        projectLocation: parameters?.projectLocation,
        includePrivate: parameters?.includePrivate,
        negateLocationFiltering: parameters?.negateLocationFiltering,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
        filterId: parameters?.filterId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createBoard<T = any>(parameters?: Parameters.CreateBoard, callback?: Callback<T>): Promise<void>;
  async createBoard<T = any>(parameters?: Parameters.CreateBoard, callback?: undefined): Promise<T>;
  async createBoard<T = any>(parameters?: Parameters.CreateBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/board',
      method: 'POST',
      data: {
        name: parameters?.name,
        type: parameters?.type,
        filterId: parameters?.filterId,
        location: parameters?.location,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoardByFilterId<T = any>(parameters: Parameters.GetBoardByFilterId, callback: Callback<T>): Promise<void>;
  async getBoardByFilterId<T = any>(parameters: Parameters.GetBoardByFilterId, callback?: undefined): Promise<T>;
  async getBoardByFilterId<T = any>(parameters: Parameters.GetBoardByFilterId, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/filter/${parameters.filterId}`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoard<T = any>(parameters: Parameters.GetBoard, callback: Callback<T>): Promise<void>;
  async getBoard<T = any>(parameters: Parameters.GetBoard, callback?: undefined): Promise<T>;
  async getBoard<T = any>(parameters: Parameters.GetBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteBoard<T = any>(parameters: Parameters.DeleteBoard, callback: Callback<T>): Promise<void>;
  async deleteBoard<T = any>(parameters: Parameters.DeleteBoard, callback?: undefined): Promise<T>;
  async deleteBoard<T = any>(parameters: Parameters.DeleteBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback: Callback<T>): Promise<void>;
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback?: undefined): Promise<T>;
  async getIssuesForBacklog<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBacklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/backlog`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getConfiguration<T = any>(parameters: Parameters.GetConfiguration, callback: Callback<T>): Promise<void>;
  async getConfiguration<T = any>(parameters: Parameters.GetConfiguration, callback?: undefined): Promise<T>;
  async getConfiguration<T = any>(parameters: Parameters.GetConfiguration, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/configuration`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getEpics<T = any>(parameters: Parameters.GetEpics, callback: Callback<T>): Promise<void>;
  async getEpics<T = any>(parameters: Parameters.GetEpics, callback?: undefined): Promise<T>;
  async getEpics<T = any>(parameters: Parameters.GetEpics, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/epic`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        done: parameters.done,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuesWithoutEpicForBoard<T = any>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback: Callback<T>): Promise<void>;
  async getIssuesWithoutEpicForBoard<T = any>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback?: undefined): Promise<T>;
  async getIssuesWithoutEpicForBoard<T = any>(parameters: Parameters.GetIssuesWithoutEpicForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/epic/none/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoardIssuesForEpic<T = any>(parameters: Parameters.GetBoardIssuesForEpic, callback: Callback<T>): Promise<void>;
  async getBoardIssuesForEpic<T = any>(parameters: Parameters.GetBoardIssuesForEpic, callback?: undefined): Promise<T>;
  async getBoardIssuesForEpic<T = any>(parameters: Parameters.GetBoardIssuesForEpic, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/epic/${parameters.epicId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFeaturesForBoard<T = any>(parameters: Parameters.GetFeaturesForBoard, callback: Callback<T>): Promise<void>;
  async getFeaturesForBoard<T = any>(parameters: Parameters.GetFeaturesForBoard, callback?: undefined): Promise<T>;
  async getFeaturesForBoard<T = any>(parameters: Parameters.GetFeaturesForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async toggleFeatures<T = any>(parameters: Parameters.ToggleFeatures, callback: Callback<T>): Promise<void>;
  async toggleFeatures<T = any>(parameters: Parameters.ToggleFeatures, callback?: undefined): Promise<T>;
  async toggleFeatures<T = any>(parameters: Parameters.ToggleFeatures, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/features`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback: Callback<T>): Promise<void>;
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback?: undefined): Promise<T>;
  async getIssuesForBoard<T = Models.SearchResultsBean>(parameters: Parameters.GetIssuesForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveIssuesToBoard<T = any>(parameters: Parameters.MoveIssuesToBoard, callback: Callback<T>): Promise<void>;
  async moveIssuesToBoard<T = any>(parameters: Parameters.MoveIssuesToBoard, callback?: undefined): Promise<T>;
  async moveIssuesToBoard<T = any>(parameters: Parameters.MoveIssuesToBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
        rankBeforeIssue: parameters.rankBeforeIssue,
        rankAfterIssue: parameters.rankAfterIssue,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjects<T = any>(parameters: Parameters.GetProjects, callback: Callback<T>): Promise<void>;
  async getProjects<T = any>(parameters: Parameters.GetProjects, callback?: undefined): Promise<T>;
  async getProjects<T = any>(parameters: Parameters.GetProjects, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/project`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectsFull<T = any>(parameters: Parameters.GetProjectsFull, callback: Callback<T>): Promise<void>;
  async getProjectsFull<T = any>(parameters: Parameters.GetProjectsFull, callback?: undefined): Promise<T>;
  async getProjectsFull<T = any>(parameters: Parameters.GetProjectsFull, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/project/full`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoardPropertyKeys<T = any>(parameters: Parameters.GetBoardPropertyKeys, callback: Callback<T>): Promise<void>;
  async getBoardPropertyKeys<T = any>(parameters: Parameters.GetBoardPropertyKeys, callback?: undefined): Promise<T>;
  async getBoardPropertyKeys<T = any>(parameters: Parameters.GetBoardPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoardProperty<T = any>(parameters: Parameters.GetBoardProperty, callback: Callback<T>): Promise<void>;
  async getBoardProperty<T = any>(parameters: Parameters.GetBoardProperty, callback?: undefined): Promise<T>;
  async getBoardProperty<T = any>(parameters: Parameters.GetBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setBoardProperty<T = any>(parameters: Parameters.SetBoardProperty, callback: Callback<T>): Promise<void>;
  async setBoardProperty<T = any>(parameters: Parameters.SetBoardProperty, callback?: undefined): Promise<T>;
  async setBoardProperty<T = any>(parameters: Parameters.SetBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteBoardProperty<T = any>(parameters: Parameters.DeleteBoardProperty, callback: Callback<T>): Promise<void>;
  async deleteBoardProperty<T = any>(parameters: Parameters.DeleteBoardProperty, callback?: undefined): Promise<T>;
  async deleteBoardProperty<T = any>(parameters: Parameters.DeleteBoardProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllQuickFilters<T = any>(parameters: Parameters.GetAllQuickFilters, callback: Callback<T>): Promise<void>;
  async getAllQuickFilters<T = any>(parameters: Parameters.GetAllQuickFilters, callback?: undefined): Promise<T>;
  async getAllQuickFilters<T = any>(parameters: Parameters.GetAllQuickFilters, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getQuickFilter<T = any>(parameters: Parameters.GetQuickFilter, callback: Callback<T>): Promise<void>;
  async getQuickFilter<T = any>(parameters: Parameters.GetQuickFilter, callback?: undefined): Promise<T>;
  async getQuickFilter<T = any>(parameters: Parameters.GetQuickFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/quickfilter/${parameters.quickFilterId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getReportsForBoard<T = any>(parameters: Parameters.GetReportsForBoard, callback: Callback<T>): Promise<void>;
  async getReportsForBoard<T = any>(parameters: Parameters.GetReportsForBoard, callback?: undefined): Promise<T>;
  async getReportsForBoard<T = any>(parameters: Parameters.GetReportsForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/reports`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllSprints<T = any>(parameters: Parameters.GetAllSprints, callback: Callback<T>): Promise<void>;
  async getAllSprints<T = any>(parameters: Parameters.GetAllSprints, callback?: undefined): Promise<T>;
  async getAllSprints<T = any>(parameters: Parameters.GetAllSprints, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/sprint`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        state: parameters.state,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBoardIssuesForSprint<T = any>(parameters: Parameters.GetBoardIssuesForSprint, callback: Callback<T>): Promise<void>;
  async getBoardIssuesForSprint<T = any>(parameters: Parameters.GetBoardIssuesForSprint, callback?: undefined): Promise<T>;
  async getBoardIssuesForSprint<T = any>(parameters: Parameters.GetBoardIssuesForSprint, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllVersions<T = any>(parameters: Parameters.GetAllVersions, callback: Callback<T>): Promise<void>;
  async getAllVersions<T = any>(parameters: Parameters.GetAllVersions, callback?: undefined): Promise<T>;
  async getAllVersions<T = any>(parameters: Parameters.GetAllVersions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/board/${parameters.boardId}/version`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        released: parameters.released,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
