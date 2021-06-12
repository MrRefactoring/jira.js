/** Details about the project. */
export interface UpdateProjectDetails {
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key?: string;
  /** The name of the project. */
  name?: string;
  /** A brief description of the project. */
  description?: string;
  /**
   * This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The user name of the project lead. Cannot be provided with `leadAccountId`.
   */
  lead?: string;
  /** The account ID of the project lead. Cannot be provided with `lead`. */
  leadAccountId?: string;
  /** A link to information about this project, such as project documentation */
  url?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: string;
  /** An integer value for the project's avatar. */
  avatarId?: number;
  /**
   * The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues.
   * Use the [Get issue security schemes](#api-rest-api-3-issuesecurityschemes-get) resource to get all issue security
   * scheme IDs.
   */
  issueSecurityScheme?: number;
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](#api-rest-api-3-permissionscheme-get) resource to see a list of all permission scheme IDs.
   */
  permissionScheme?: number;
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](#api-rest-api-3-notificationscheme-get) resource to get a list of notification scheme IDs.
   */
  notificationScheme?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-3-projectCategory-get) operation.
   */
  categoryId?: number;
}
