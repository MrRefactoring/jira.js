import type { Client } from '../client';
import type { Request } from '../request';
import type { GetTeamsParameters } from './parameters/getTeamsParameters';
import type { AddAtlassianTeamParameters } from './parameters/addAtlassianTeamParameters';
import type { RemoveAtlassianTeamParameters } from './parameters/removeAtlassianTeamParameters';
import type { GetAtlassianTeamParameters } from './parameters/getAtlassianTeamParameters';
import type { UpdateAtlassianTeamParameters } from './parameters/updateAtlassianTeamParameters';
import type { CreatePlanOnlyTeamParameters } from './parameters/createPlanOnlyTeamParameters';
import type { DeletePlanOnlyTeamParameters } from './parameters/deletePlanOnlyTeamParameters';
import type { GetPlanOnlyTeamParameters } from './parameters/getPlanOnlyTeamParameters';
import type { UpdatePlanOnlyTeamParameters } from './parameters/updatePlanOnlyTeamParameters';

export class TeamsInPlan {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * plan-only and Atlassian teams in a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getTeams(parameters: GetTeamsParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team`,
      method: 'GET',
      query: {
        cursor: parameters.cursor,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds an existing Atlassian team to a plan and configures their plannning settings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addAtlassianTeam(parameters: AddAtlassianTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian`,
      method: 'POST',
      body: {
        capacity: parameters.capacity,
        id: parameters.id,
        issueSourceId: parameters.issueSourceId,
        planningStyle: parameters.planningStyle,
        sprintLength: parameters.sprintLength,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes an Atlassian team from a plan and deletes their planning settings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeAtlassianTeam(parameters: RemoveAtlassianTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns planning settings for an Atlassian team in a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAtlassianTeam(parameters: GetAtlassianTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates any of the following planning settings of an Atlassian team in a plan using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902). *
   *
   * - - PlanningStyle
   * - - IssueSourceId
   * - - SprintLength
   * - - Capacity
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * -
   * - _Note that "add" operations do not respect array indexes in target locations. Call the "Get Atlassian team in plan"
   *   endpoint to find out the order of array elements._
   */
  async updateAtlassianTeam(parameters: UpdateAtlassianTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/atlassian/${parameters.atlassianTeamId}`,
      method: 'PUT',
      body: parameters.body,
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a plan-only team and configures their planning settings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlanOnlyTeam(parameters: CreatePlanOnlyTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly`,
      method: 'POST',
      body: {
        capacity: parameters.capacity,
        issueSourceId: parameters.issueSourceId,
        memberAccountIds: parameters.memberAccountIds,
        name: parameters.name,
        planningStyle: parameters.planningStyle,
        sprintLength: parameters.sprintLength,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a plan-only team and their planning settings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePlanOnlyTeam(parameters: DeletePlanOnlyTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns planning settings for a plan-only team. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlanOnlyTeam(parameters: GetPlanOnlyTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates any of the following planning settings of a plan-only team using [JSON
   * Patch](https://datatracker.ietf.org/doc/html/rfc6902). *
   *
   * - - Name
   * - - PlanningStyle
   * - - IssueSourceId
   * - - SprintLength
   * - - Capacity
   * - - MemberAccountIds
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * -
   * - _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan-only team"
   *   endpoint to find out the order of array elements._
   */
  async updatePlanOnlyTeam(parameters: UpdatePlanOnlyTeamParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/team/planonly/${parameters.planOnlyTeamId}`,
      method: 'PUT',
      body: parameters.body,
    };

    return this.client.sendRequest(request);
  }
}
