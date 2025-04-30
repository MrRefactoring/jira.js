import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class TeamsInPlan {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * plan-only and Atlassian teams in a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getTeams<T = Models.PageWithCursorGetTeamResponseForPage>(
    parameters: Parameters.GetTeams,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * plan-only and Atlassian teams in a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getTeams<T = Models.PageWithCursorGetTeamResponseForPage>(
    parameters: Parameters.GetTeams,
    callback?: never,
  ): Promise<T>;
  async getTeams<T = Models.PageWithCursorGetTeamResponseForPage>(
    parameters: Parameters.GetTeams,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team`,
      method: 'GET',
      params: {
        cursor: parameters.cursor,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds an existing Atlassian team to a plan and configures their plannning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addAtlassianTeam<T = void>(parameters: Parameters.AddAtlassianTeam, callback: Callback<T>): Promise<void>;
  /**
   * Adds an existing Atlassian team to a plan and configures their plannning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addAtlassianTeam<T = void>(parameters: Parameters.AddAtlassianTeam, callback?: never): Promise<T>;
  async addAtlassianTeam<T = void>(parameters: Parameters.AddAtlassianTeam, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian`,
      method: 'POST',
      data: {
        capacity: parameters.capacity,
        id: parameters.id,
        issueSourceId: parameters.issueSourceId,
        planningStyle: parameters.planningStyle,
        sprintLength: parameters.sprintLength,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns planning settings for an Atlassian team in a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAtlassianTeam<T = Models.GetAtlassianTeamResponse>(
    parameters: Parameters.GetAtlassianTeam,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns planning settings for an Atlassian team in a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAtlassianTeam<T = Models.GetAtlassianTeamResponse>(
    parameters: Parameters.GetAtlassianTeam,
    callback?: never,
  ): Promise<T>;
  async getAtlassianTeam<T = Models.GetAtlassianTeamResponse>(
    parameters: Parameters.GetAtlassianTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates any of the following planning settings of an Atlassian team in a plan using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - PlanningStyle
   * - IssueSourceId
   * - SprintLength
   * - Capacity
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get Atlassian team in plan"
   * endpoint to find out the order of array elements._
   */
  async updateAtlassianTeam<T = void>(parameters: Parameters.UpdateAtlassianTeam, callback: Callback<T>): Promise<void>;
  /**
   * Updates any of the following planning settings of an Atlassian team in a plan using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - PlanningStyle
   * - IssueSourceId
   * - SprintLength
   * - Capacity
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get Atlassian team in plan"
   * endpoint to find out the order of array elements._
   */
  async updateAtlassianTeam<T = void>(parameters: Parameters.UpdateAtlassianTeam, callback?: never): Promise<T>;
  async updateAtlassianTeam<T = void>(
    parameters: Parameters.UpdateAtlassianTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes an Atlassian team from a plan and deletes their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAtlassianTeam<T = void>(parameters: Parameters.RemoveAtlassianTeam, callback: Callback<T>): Promise<void>;
  /**
   * Removes an Atlassian team from a plan and deletes their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAtlassianTeam<T = void>(parameters: Parameters.RemoveAtlassianTeam, callback?: never): Promise<T>;
  async removeAtlassianTeam<T = void>(
    parameters: Parameters.RemoveAtlassianTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a plan-only team and configures their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlanOnlyTeam<T = unknown>(
    parameters: Parameters.CreatePlanOnlyTeam,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a plan-only team and configures their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlanOnlyTeam<T = unknown>(parameters: Parameters.CreatePlanOnlyTeam, callback?: never): Promise<T>;
  async createPlanOnlyTeam<T = unknown>(
    parameters: Parameters.CreatePlanOnlyTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly`,
      method: 'POST',
      data: {
        capacity: parameters.capacity,
        issueSourceId: parameters.issueSourceId,
        memberAccountIds: parameters.memberAccountIds,
        name: parameters.name,
        planningStyle: parameters.planningStyle,
        sprintLength: parameters.sprintLength,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns planning settings for a plan-only team.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlanOnlyTeam<T = Models.GetPlanOnlyTeamResponse>(
    parameters: Parameters.GetPlanOnlyTeam,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns planning settings for a plan-only team.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlanOnlyTeam<T = Models.GetPlanOnlyTeamResponse>(
    parameters: Parameters.GetPlanOnlyTeam,
    callback?: never,
  ): Promise<T>;
  async getPlanOnlyTeam<T = Models.GetPlanOnlyTeamResponse>(
    parameters: Parameters.GetPlanOnlyTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates any of the following planning settings of a plan-only team using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - Name
   * - PlanningStyle
   * - IssueSourceId
   * - SprintLength
   * - Capacity
   * - MemberAccountIds
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan-only team"
   * endpoint to find out the order of array elements._
   */
  async updatePlanOnlyTeam<T = void>(parameters: Parameters.UpdatePlanOnlyTeam, callback: Callback<T>): Promise<void>;
  /**
   * Updates any of the following planning settings of a plan-only team using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - Name
   * - PlanningStyle
   * - IssueSourceId
   * - SprintLength
   * - Capacity
   * - MemberAccountIds
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan-only team"
   * endpoint to find out the order of array elements._
   */
  async updatePlanOnlyTeam<T = void>(parameters: Parameters.UpdatePlanOnlyTeam, callback?: never): Promise<T>;
  async updatePlanOnlyTeam<T = void>(
    parameters: Parameters.UpdatePlanOnlyTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a plan-only team and their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePlanOnlyTeam<T = void>(parameters: Parameters.DeletePlanOnlyTeam, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a plan-only team and their planning settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePlanOnlyTeam<T = void>(parameters: Parameters.DeletePlanOnlyTeam, callback?: never): Promise<T>;
  async deletePlanOnlyTeam<T = void>(
    parameters: Parameters.DeletePlanOnlyTeam,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
