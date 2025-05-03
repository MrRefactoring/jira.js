/** Project Details */
export interface CustomTemplatesProjectDetails {
  /** The access level of the project. Only used by team-managed project */
  accessLevel?: 'open' | 'limited' | 'private' | 'free' | string;
  /** Additional properties of the project */
  additionalProperties?: {};
  /** The default assignee when creating issues in the project */
  assigneeType?: 'PROJECT_DEFAULT' | 'COMPONENT_LEAD' | 'PROJECT_LEAD' | 'UNASSIGNED' | string;
  /**
   * The ID of the project's avatar. Use the [Get project avatars](#api-rest-api-3-project-projectIdOrKey-avatar-get)
   * operation to list the available avatars in a project.
   */
  avatarId?: number;
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-3-projectCategory-get) operation.
   */
  categoryId?: number;
  /** Brief description of the project */
  description?: string;
  /** Whether components are enabled for the project. Only used by company-managed project */
  enableComponents?: boolean;
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key?: string;
  /** The default language for the project */
  language?: string;
  /**
   * The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be
   * provided with `lead`.
   */
  leadAccountId?: string;
  /** Name of the project */
  name?: string;
  /** A link to information about this project, such as project documentation */
  url?: string;
}
