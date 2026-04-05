import { z } from 'zod';

/** Details about a project. */
export const ProjectDetailsSchema = z.object({
  avatarUrls: z
    .object({
      /** The URL of the item's 16x16 pixel avatar. */
      '16x16': z.url().optional(),
      /** The URL of the item's 24x24 pixel avatar. */
      '24x24': z.url().optional(),
      /** The URL of the item's 32x32 pixel avatar. */
      '32x32': z.url().optional(),
      /** The URL of the item's 48x48 pixel avatar. */
      '48x48': z.url().optional(),
    })
    .optional(),
  /** The ID of the project. */
  id: z.string().optional(),
  /** The key of the project. */
  key: z.string().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  /** A project category. */
  projectCategory: z
    .object({
      /** The name of the project category. */
      description: z.string().optional(),
      /** The ID of the project category. */
      id: z.string().optional(),
      /** The description of the project category. */
      name: z.string().optional(),
      /** The URL of the project category. */
      self: z.string().optional(),
    })
    .optional(),
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
