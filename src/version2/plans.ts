import type { Client } from '../client';
import type { Request } from '../request';
import type { GetPlansParameters } from './parameters/getPlansParameters';
import type { CreatePlanParameters } from './parameters/createPlanParameters';
import type { GetPlanParameters } from './parameters/getPlanParameters';
import type { UpdatePlanParameters } from './parameters/updatePlanParameters';
import type { ArchivePlanParameters } from './parameters/archivePlanParameters';
import type { DuplicatePlanParameters } from './parameters/duplicatePlanParameters';
import type { TrashPlanParameters } from './parameters/trashPlanParameters';

export class Plans {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of plans.
   * *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlans(parameters: GetPlansParameters) {
    const request: Request = {
      url: '/rest/api/2/plans/plan',
      method: 'GET',
      query: {
        includeTrashed: parameters.includeTrashed,
        includeArchived: parameters.includeArchived,
        cursor: parameters.cursor,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlan(parameters: CreatePlanParameters) {
    const request: Request = {
      url: '/rest/api/2/plans/plan',
      method: 'POST',
      query: {
        useGroupId: parameters.useGroupId,
      },
      body: {
        crossProjectReleases: parameters.crossProjectReleases,
        customFields: parameters.customFields,
        exclusionRules: parameters.exclusionRules,
        issueSources: parameters.issueSources,
        leadAccountId: parameters.leadAccountId,
        name: parameters.name,
        permissions: parameters.permissions,
        scheduling: parameters.scheduling,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlan(parameters: GetPlanParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}`,
      method: 'GET',
      query: {
        useGroupId: parameters.useGroupId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates any of the following details of a plan using [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902). *
   *
   * - - Name
   * - - LeadAccountId
   * - - Scheduling
   * -
   * - - Estimation with StoryPoints, Days or Hours as possible values
   * - - StartDate
   * -
   * - - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   * - - DateCustomFieldId
   * - - EndDate
   * -
   * - - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   * - - DateCustomFieldId
   * - - InferredDates with None, SprintDates or ReleaseDates as possible values
   * - - Dependencies with Sequential or Concurrent as possible values
   * - - IssueSources
   * -
   * - - Type with Board, Project or Filter as possible values
   * - - Value
   * - - ExclusionRules
   * -
   * - - NumberOfDaysToShowCompletedIssues
   * - - IssueIds
   * - - WorkStatusIds
   * - - WorkStatusCategoryIds
   * - - IssueTypeIds
   * - - ReleaseIds
   * - - CrossProjectReleases
   * -
   * - - Name
   * - - ReleaseIds
   * - - CustomFields
   * -
   * - - CustomFieldId
   * - - Filter
   * - - Permissions
   * -
   * - - Type with View or Edit as possible values
   * - - Holder
   * -
   * - - Type with Group or AccountId as possible values
   * - - Value
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * -
   * - _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan" endpoint to find
   *   out the order of array elements._
   */
  async updatePlan(parameters: UpdatePlanParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}`,
      method: 'PUT',
      query: {
        useGroupId: parameters.useGroupId,
      },
      body: parameters.body,
    };

    return this.client.sendRequest(request);
  }

  /**
   * Archives a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archivePlan(parameters: ArchivePlanParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/archive`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Duplicates a plan. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async duplicatePlan(parameters: DuplicatePlanParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/duplicate`,
      method: 'POST',
      body: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Moves a plan to trash. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashPlan(parameters: TrashPlanParameters) {
    const request: Request = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/trash`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }
}
