import { z } from 'zod';

/** Project Details */
export const CustomTemplatesProjectDetailsSchema = z.object({
  /** The access level of the project. Only used by team-managed project */
  accessLevel: z.enum(['open', 'limited', 'private', 'free']).optional(),
  /** Additional properties of the project */
  additionalProperties: z.object({}).optional(),
  /** The default assignee when creating issues in the project */
  assigneeType: z.enum(['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /**
   * The ID of the project's avatar. Use the [Get project avatars](#api-rest-api-3-project-projectIdOrKey-avatar-get)
   * operation to list the available avatars in a project.
   */
  avatarId: z.number().int().optional(),
  /**
   * The ID of the project's category. A complete list of category IDs is found using the [Get all project
   * categories](#api-rest-api-2-projectCategory-get) operation.
   */
  categoryId: z.number().int().optional(),
  /** Brief description of the project */
  description: z.string().optional(),
  /** Whether components are enabled for the project. Only used by company-managed project */
  enableComponents: z.boolean().optional(),
  /**
   * Project keys must be unique and start with an uppercase letter followed by one or more uppercase alphanumeric
   * characters. The maximum length is 10 characters.
   */
  key: z.string().optional(),
  /** The default language for the project */
  language: z.string().optional(),
  /**
   * The account ID of the project lead. Either `lead` or `leadAccountId` must be set when creating a project. Cannot be
   * provided with `lead`.
   */
  leadAccountId: z.string().optional(),
  /** Name of the project */
  name: z.string().optional(),
  /** A link to information about this project, such as project documentation */
  url: z.string().optional(),
});

export type CustomTemplatesProjectDetails = z.infer<typeof CustomTemplatesProjectDetailsSchema>;
