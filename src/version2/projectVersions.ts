import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectVersions {
  constructor(private client: Client) { }
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback: Callback<T>): Promise<void>;
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback?: undefined): Promise<T>;
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
        status: parameters.status,
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getProjectVersions<T = any>(parameters: Parameters.GetProjectVersions, callback: Callback<T>): Promise<void>;
  async getProjectVersions<T = any>(parameters: Parameters.GetProjectVersions, callback?: undefined): Promise<T>;
  async getProjectVersions<T = any>(parameters: Parameters.GetProjectVersions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: Callback<T>): Promise<void>;
  async createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: undefined): Promise<T>;
  async createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/version',
      method: 'POST',
      data: {
        expand: parameters?.expand,
        self: parameters?.self,
        id: parameters?.id,
        description: parameters?.description,
        name: parameters?.name,
        archived: parameters?.archived,
        released: parameters?.released,
        startDate: parameters?.startDate,
        releaseDate: parameters?.releaseDate,
        overdue: parameters?.overdue,
        userStartDate: parameters?.userStartDate,
        userReleaseDate: parameters?.userReleaseDate,
        project: parameters?.project,
        projectId: parameters?.projectId,
        moveUnfixedIssuesTo: parameters?.moveUnfixedIssuesTo,
        operations: parameters?.operations,
        issuesStatusForFixVersion: parameters?.issuesStatusForFixVersion,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback: Callback<T>): Promise<void>;
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback?: undefined): Promise<T>;
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback: Callback<T>): Promise<void>;
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: undefined): Promise<T>;
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'PUT',
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback: Callback<T>): Promise<void>;
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback?: undefined): Promise<T>;
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'DELETE',
      params: {
        moveFixIssuesTo: parameters.moveFixIssuesTo,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback: Callback<T>): Promise<void>;
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: undefined): Promise<T>;
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback: Callback<T>): Promise<void>;
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback?: undefined): Promise<T>;
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}/move`,
      method: 'POST',
      data: {
        after: parameters.after,
        position: parameters.position,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback: Callback<T>): Promise<void>;
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback?: undefined): Promise<T>;
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback: Callback<T>): Promise<void>;
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: undefined): Promise<T>;
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
      method: 'POST',
      data: {
        moveFixIssuesTo: parameters.moveFixIssuesTo,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
        customFieldReplacementList: parameters.customFieldReplacementList,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback: Callback<T>): Promise<void>;
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback?: undefined): Promise<T>;
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
