import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class DevelopmentInformation {
  constructor(private readonly client: Sender) { }

  public async storeDevelopmentInformation(
    params: {
      Authorization?: string;
      repositories: Array<{
        name: string;
        description?: string;
        forkOf?: string;
        url: string;
        commits?: Array<{
          id: string;
          issueKeys: Array<string>;
          updateSequenceId: number;
          hash: string;
          flags?: Array<string>;
          message: string;
          author: {
            name: string;
            email?: string;
            username?: string;
            url?: string;
            avatar?: string;
          };
          fileCount: number;
          url: string;
          files?: Array<{
            path: string;
            url: string;
            changeType: 'ADDED' | 'COPIED' | 'DELETED' | 'MODIFIED' | 'MOVED' | 'UNKNOWN';
            linesAdded: number;
            linesRemoved: number;
          }>;
          authorTimestamp: string;
          displayId: string;
        }>;
        branches?: Array<{
          id: string;
          issueKeys: Array<string>;
          updateSequenceId: number;
          name: string;
          lastCommit: {
            id: string;
            issueKeys: Array<string>;
            updateSequenceId: number;
            hash: string;
            flags?: Array<string>;
            message: string;
            author: {
              name: string;
              email?: string;
              username?: string;
              url?: string;
              avatar?: string;
            };
            fileCount: number;
            url: string;
            files?: Array<{
              path: string;
              url: string;
              changeType: 'ADDED' | 'COPIED' | 'DELETED' | 'MODIFIED' | 'MOVED' | 'UNKNOWN';
              linesAdded: number;
              linesRemoved: number;
            }>;
            authorTimestamp: string;
            displayId: string;
          };
          createPullRequestUrl?: string;
          url: string;
        }>;
        pullRequests?: Array<{
          id: string;
          issueKeys: Array<string>;
          updateSequenceId: number;
          status: 'OPEN' | 'MERGED' | 'DECLINED' | 'UNKNOWN';
          title: string;
          author: {
            name: string;
            email?: string;
            username?: string;
            url?: string;
            avatar?: string;
          };
          commentCount: number;
          sourceBranch: string;
          sourceBranchUrl?: string;
          lastUpdate: string;
          destinationBranch?: string;
          reviewers?: Array<{
            name: string;
            approvalStatus?: 'APPROVED' | 'UNAPPROVED';
            url?: string;
            avatar?: string;
          }>;
          url: string;
          displayId: string;
        }>;
        avatar?: string;
        avatarDescription?: string;
        id: string;
        updateSequenceId: number;
      }>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/devinfo/0.10/bulk',
      method: 'POST',
      headers: {
        Authorization: params.Authorization,
      },
      data: { ...params, Authorization: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getRepository(
    params: {
      repositoryId: string;
      Authorization?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/devinfo/0.10/repository/${params.repositoryId}`,
      method: 'GET',
      headers: {
        Authorization: params.Authorization,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteRepository(
    params: {
      repositoryId: string;
      _updateSequenceId?: number;
      Authorization?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/devinfo/0.10/repository/${params.repositoryId}`,
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteDevelopmentInformationByProperties(
    params: {
      Authorization?: string;
      _updateSequenceId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/devinfo/0.10/bulkByProperties',
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async checkIfDataExistsForTheSuppliedProperties(
    params: {
      Authorization?: string;
      _updateSequenceId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/devinfo/0.10/existsByProperties',
      method: 'GET',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteDevelopmentInformationEntity(
    params: {
      repositoryId: string;
      entityType: string;
      entityId: string;
      _updateSequenceId?: number;
      Authorization?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/devinfo/0.10/repository/${params.repositoryId}/${params.entityType}/${params.entityId}`,
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
