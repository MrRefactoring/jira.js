import { z } from 'zod';

/** Details about a project. */
export const ProjectDetailsSchema = z.object({
  /** The URLs of the project's avatars. */
  avatarUrls: z.unknown().optional(),
  /** The ID of the project. */
  id: z.string().optional(),
  /** The key of the project. */
  key: z.string().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  /** The category the project belongs to. */
  projectCategory: z.unknown().optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
  /** The URL of the project details. */
  self: z.string().optional(),
  /** Whether or not the project is simplified. */
  simplified: z.boolean().optional(),
});

export type ProjectDetails = z.infer<typeof ProjectDetailsSchema>;
