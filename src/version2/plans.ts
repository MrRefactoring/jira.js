import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Plans {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of plans.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlans<T = Models.PageWithCursorGetPlanResponseForPage>(
    parameters: Parameters.GetPlans | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of plans.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlans<T = Models.PageWithCursorGetPlanResponseForPage>(
    parameters?: Parameters.GetPlans,
    callback?: never,
  ): Promise<T>;
  async getPlans<T = Models.PageWithCursorGetPlanResponseForPage>(
    parameters?: Parameters.GetPlans,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/plans/plan',
      method: 'GET',
      params: {
        includeTrashed: parameters?.includeTrashed,
        includeArchived: parameters?.includeArchived,
        cursor: parameters?.cursor,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlan<T = unknown>(parameters: Parameters.CreatePlan, callback: Callback<T>): Promise<void>;
  /**
   * Creates a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPlan<T = unknown>(parameters: Parameters.CreatePlan, callback?: never): Promise<T>;
  async createPlan<T = unknown>(parameters: Parameters.CreatePlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/plans/plan',
      method: 'POST',
      params: {
        useGroupId: parameters.useGroupId,
      },
      data: {
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

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlan<T = Models.Plan>(parameters: Parameters.GetPlan, callback: Callback<T>): Promise<void>;
  /**
   * Returns a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getPlan<T = Models.Plan>(parameters: Parameters.GetPlan, callback?: never): Promise<T>;
  async getPlan<T = Models.Plan>(parameters: Parameters.GetPlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}`,
      method: 'GET',
      params: {
        useGroupId: parameters.useGroupId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates any of the following details of a plan using [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - Name
   * - LeadAccountId
   * - Scheduling
   *
   *   - Estimation with StoryPoints, Days or Hours as possible values
   *   - StartDate
   *
   *       - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   *       - DateCustomFieldId
   *   - EndDate
   *
   *       - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   *       - DateCustomFieldId
   *   - InferredDates with None, SprintDates or ReleaseDates as possible values
   *   - Dependencies with Sequential or Concurrent as possible values
   * - IssueSources
   *
   *   - Type with Board, Project or Filter as possible values
   *   - Value
   * - ExclusionRules
   *
   *   - NumberOfDaysToShowCompletedIssues
   *   - IssueIds
   *   - WorkStatusIds
   *   - WorkStatusCategoryIds
   *   - IssueTypeIds
   *   - ReleaseIds
   * - CrossProjectReleases
   *
   *   - Name
   *   - ReleaseIds
   * - CustomFields
   *
   *   - CustomFieldId
   *   - Filter
   * - Permissions
   *
   *   - Type with View or Edit as possible values
   *   - Holder
   *
   *       - Type with Group or AccountId as possible values
   *       - Value
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan" endpoint to find
   * out the order of array elements._
   */
  async updatePlan<T = void>(parameters: Parameters.UpdatePlan, callback: Callback<T>): Promise<void>;
  /**
   * Updates any of the following details of a plan using [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902).
   *
   * - Name
   * - LeadAccountId
   * - Scheduling
   *
   *   - Estimation with StoryPoints, Days or Hours as possible values
   *   - StartDate
   *
   *       - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   *       - DateCustomFieldId
   *   - EndDate
   *
   *       - Type with DueDate, TargetStartDate, TargetEndDate or DateCustomField as possible values
   *       - DateCustomFieldId
   *   - InferredDates with None, SprintDates or ReleaseDates as possible values
   *   - Dependencies with Sequential or Concurrent as possible values
   * - IssueSources
   *
   *   - Type with Board, Project or Filter as possible values
   *   - Value
   * - ExclusionRules
   *
   *   - NumberOfDaysToShowCompletedIssues
   *   - IssueIds
   *   - WorkStatusIds
   *   - WorkStatusCategoryIds
   *   - IssueTypeIds
   *   - ReleaseIds
   * - CrossProjectReleases
   *
   *   - Name
   *   - ReleaseIds
   * - CustomFields
   *
   *   - CustomFieldId
   *   - Filter
   * - Permissions
   *
   *   - Type with View or Edit as possible values
   *   - Holder
   *
   *       - Type with Group or AccountId as possible values
   *       - Value
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   *
   * _Note that "add" operations do not respect array indexes in target locations. Call the "Get plan" endpoint to find
   * out the order of array elements._
   */
  async updatePlan<T = void>(parameters: Parameters.UpdatePlan, callback?: never): Promise<T>;
  async updatePlan<T = void>(parameters: Parameters.UpdatePlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}`,
      method: 'PUT',
      params: {
        useGroupId: parameters.useGroupId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Archives a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archivePlan<T = void>(parameters: Parameters.ArchivePlan, callback: Callback<T>): Promise<void>;
  /**
   * Archives a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async archivePlan<T = void>(parameters: Parameters.ArchivePlan, callback?: never): Promise<T>;
  async archivePlan<T = void>(parameters: Parameters.ArchivePlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/archive`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Duplicates a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async duplicatePlan<T = unknown>(parameters: Parameters.DuplicatePlan, callback: Callback<T>): Promise<void>;
  /**
   * Duplicates a plan.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async duplicatePlan<T = unknown>(parameters: Parameters.DuplicatePlan, callback?: never): Promise<T>;
  async duplicatePlan<T = unknown>(parameters: Parameters.DuplicatePlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/duplicate`,
      method: 'POST',
      data: {
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Moves a plan to trash.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashPlan<T = void>(parameters: Parameters.TrashPlan, callback: Callback<T>): Promise<void>;
  /**
   * Moves a plan to trash.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async trashPlan<T = void>(parameters: Parameters.TrashPlan, callback?: never): Promise<T>;
  async trashPlan<T = void>(parameters: Parameters.TrashPlan, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/plans/plan/${parameters.planId}/trash`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }
}
