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
  /** The account ID of the project lead. Cannot be provided with `lead`. */
  leadAccountId: string;
  /** A link to information about this project, such as project documentation */
  url?: string;
  /** The default assignee when creating issues for this project. */
  assigneeType?: string;
  /** An integer value for the project's avatar. */
  avatarId?: number;
  /**
   * The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues.
   * Use the [Get issue security schemes](#api-rest-api-2-issuesecurityschemes-get) resource to get all issue security
   * scheme IDs.
   */
  issueSecurityScheme?: number;
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](#api-rest-api-2-permissionscheme-get) resource to see a list of all permission scheme IDs.
   */
  permissionScheme?: number;
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](#api-rest-api-2-notificationscheme-get) resource to get a list of notification scheme IDs.
   */
  notificationScheme?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-2-projectCategory-get) operation. To remove the project category from the project, set
   * the value to `-1.`
   */
  categoryId?: number;
  /**
   * Previous project keys to be released from the current project. Released keys must belong to the current project and
   * not contain the current project key
   */
  releasedProjectKeys?: string[];
}
