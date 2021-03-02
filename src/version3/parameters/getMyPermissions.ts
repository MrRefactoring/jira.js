export interface GetMyPermissions {
  /** The key of project. Ignored if `projectId` is provided. */
  projectKey?: string;
  /** The ID of project. */
  projectId?: string;
  /** The key of the issue. Ignored if `issueId` is provided. */
  issueKey?: string;
  /** The ID of the issue. */
  issueId?: string;
  /** A list of permission keys. (Required) This parameter accepts a comma-separated list. To get the list of available permissions, use [Get all permissions](#api-rest-api-3-permissions-get). */
  permissions?: string;
  projectUuid?: string;
  projectConfigurationUuid?: string;
}
