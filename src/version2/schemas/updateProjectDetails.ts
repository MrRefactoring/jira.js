import { z } from 'zod';

/** Details about the project. */
export const UpdateProjectDetailsSchema = z.object({
  /** The default assignee when creating issues for this project. */
  assigneeType: z.enum(['PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** An integer value for the project's avatar. */
  avatarId: z.number().int().optional(),
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-2-projectCategory-get) operation. To remove the project category from the project, set
   * the value to `-1.`
   */
  categoryId: z.number().int().optional(),
  /** A brief description of the project. */
  description: z.string().optional(),
  /**
   * The ID of the issue security scheme for the project, which enables you to control who can and cannot view issues.
   * Use the [Get issue security schemes](#api-rest-api-2-issuesecurityschemes-get) resource to get all issue security
   * scheme IDs.
   */
  issueSecurityScheme: z.number().int().optional(),
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key: z.string().optional(),
  /**
   * This parameter is deprecated because of privacy changes. Use `leadAccountId` instead. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details. The user name of the project lead. Cannot be provided with `leadAccountId`.
   */
  lead: z.string().optional(),
  /** The account ID of the project lead. Cannot be provided with `lead`. */
  leadAccountId: z.string().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  /**
   * The ID of the notification scheme for the project. Use the [Get notification
   * schemes](#api-rest-api-2-notificationscheme-get) resource to get a list of notification scheme IDs.
   */
  notificationScheme: z.number().int().optional(),
  /**
   * The ID of the permission scheme for the project. Use the [Get all permission
   * schemes](#api-rest-api-2-permissionscheme-get) resource to see a list of all permission scheme IDs.
   */
  permissionScheme: z.number().int().optional(),
  /**
   * Previous project keys to be released from the current project. Released keys must belong to the current project and
   * not contain the current project key
   */
  releasedProjectKeys: z.array(z.string()).optional(),
  /** A link to information about this project, such as project documentation */
  url: z.string().optional(),
});

export type UpdateProjectDetails = z.infer<typeof UpdateProjectDetailsSchema>;
