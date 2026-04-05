import { z } from 'zod';

/** A status. */
export const StatusDetailsSchema = z.object({
  /** The description of the status. */
  description: z.string().optional(),
  /** The URL of the icon used to represent the status. */
  iconUrl: z.string().optional(),
  /** The ID of the status. */
  id: z.string().optional(),
  /** The name of the status. */
  name: z.string().optional(),
  /**
   * The projects the item is associated with. Indicated for items associated with [next-gen
   * projects](https://confluence.atlassian.com/x/loMyO).
   */
  scope: z
    .object({
      /** Details about a project. */
      project: z
        .object({
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
           * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of
           * the project.
           */
          projectTypeKey: z.enum(['software', 'service_desk', 'business']).optional(),
          /** The URL of the project details. */
          self: z.string().optional(),
          /** Whether or not the project is simplified. */
          simplified: z.boolean().optional(),
        })
        .optional(),
      /** The type of scope. */
      type: z.enum(['PROJECT', 'TEMPLATE']).optional(),
    })
    .optional(),
  /** The URL of the status. */
  self: z.string().optional(),
  /** A status category. */
  statusCategory: z
    .object({
      /** The name of the color used to represent the status category. */
      colorName: z.string().optional(),
      /** The ID of the status category. */
      id: z.number().optional(),
      /** The key of the status category. */
      key: z.string().optional(),
      /** The name of the status category. */
      name: z.string().optional(),
      /** The URL of the status category. */
      self: z.string().optional(),
    })
    .optional(),
});

export type StatusDetails = z.infer<typeof StatusDetailsSchema>;
