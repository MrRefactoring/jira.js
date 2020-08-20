import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  PageBeanVersion,
  Version,
  Version,
  Version,
  VersionIssueCounts,
  VersionUnresolvedIssuesCount,
} from '../schemas';
export class ProjectVersions {
  constructor(private readonly client: Sender) {}

  public async getProjectVersionsPaginated(
    params: {
      projectIdOrKey: string;
      startAt?: number;
      maxResults?: number;
      orderBy?: string;
      query?: string;
      status?: string;
      expand?: string;
    },
    callback?: Callback<PageBeanVersion>,
  ): Promise<PageBeanVersion> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/version`,
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
        orderBy: params.orderBy,
        query: params.query,
        status: params.status,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getProjectVersions(
    params: {
      projectIdOrKey: string;
      expand?: string;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/project/${params.projectIdOrKey}/versions`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createVersion(
    params?: {
      expand?: string;
      self?: string;
      id?: string;
      description?: string;
      name?: string;
      archived?: boolean;
      released?: boolean;
      startDate?: string;
      releaseDate?: string;
      overdue?: boolean;
      userStartDate?: string;
      userReleaseDate?: string;
      project?: string;
      projectId?: number;
      moveUnfixedIssuesTo?: string;
      operations?: Array<any>;
      issuesStatusForFixVersion?: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/version',
      method: 'POST',
      data: {
        expand: params.expand,
        self: params.self,
        id: params.id,
        description: params.description,
        name: params.name,
        archived: params.archived,
        released: params.released,
        startDate: params.startDate,
        releaseDate: params.releaseDate,
        overdue: params.overdue,
        userStartDate: params.userStartDate,
        userReleaseDate: params.userReleaseDate,
        project: params.project,
        projectId: params.projectId,
        moveUnfixedIssuesTo: params.moveUnfixedIssuesTo,
        operations: params.operations,
        issuesStatusForFixVersion: params.issuesStatusForFixVersion,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getVersion(
    params: {
      id: string;
      expand?: string;
    },
    callback?: Callback<Version>,
  ): Promise<Version> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateVersion(
    params: {
      id: string;
      expand?: string;
      self?: string;
      description?: string;
      name?: string;
      archived?: boolean;
      released?: boolean;
      startDate?: string;
      releaseDate?: string;
      overdue?: boolean;
      userStartDate?: string;
      userReleaseDate?: string;
      project?: string;
      projectId?: number;
      moveUnfixedIssuesTo?: string;
      operations?: Array<any>;
      issuesStatusForFixVersion?: any;
    },
    callback?: Callback<Version>,
  ): Promise<Version> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}`,
      method: 'PUT',
      data: {
        expand: params.expand,
        self: params.self,
        id: params.id,
        description: params.description,
        name: params.name,
        archived: params.archived,
        released: params.released,
        startDate: params.startDate,
        releaseDate: params.releaseDate,
        overdue: params.overdue,
        userStartDate: params.userStartDate,
        userReleaseDate: params.userReleaseDate,
        project: params.project,
        projectId: params.projectId,
        moveUnfixedIssuesTo: params.moveUnfixedIssuesTo,
        operations: params.operations,
        issuesStatusForFixVersion: params.issuesStatusForFixVersion,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteVersion(
    params: {
      id: string;
      moveFixIssuesTo?: string;
      moveAffectedIssuesTo?: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}`,
      method: 'DELETE',
      params: {
        moveFixIssuesTo: params.moveFixIssuesTo,
        moveAffectedIssuesTo: params.moveAffectedIssuesTo,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async mergeVersions(
    params: {
      id: string;
      moveIssuesTo: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}/mergeto/${params.moveIssuesTo}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  public async moveVersion(
    params: {
      id: string;
      after?: string;
      position?: string;
    },
    callback?: Callback<Version>,
  ): Promise<Version> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}/move`,
      method: 'POST',
      data: {
        after: params.after,
        position: params.position,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getVersionsRelatedIssuesCount(
    params: {
      id: string;
    },
    callback?: Callback<VersionIssueCounts>,
  ): Promise<VersionIssueCounts> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteAndReplaceVersion(
    params: {
      id: string;
      moveFixIssuesTo?: number;
      moveAffectedIssuesTo?: number;
      customFieldReplacementList?: Array<any>;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}/removeAndSwap`,
      method: 'POST',
      data: {
        moveFixIssuesTo: params.moveFixIssuesTo,
        moveAffectedIssuesTo: params.moveAffectedIssuesTo,
        customFieldReplacementList: params.customFieldReplacementList,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getVersionsUnresolvedIssuesCount(
    params: {
      id: string;
    },
    callback?: Callback<VersionUnresolvedIssuesCount>,
  ): Promise<VersionUnresolvedIssuesCount> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/version/${params.id}/unresolvedIssueCount`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
