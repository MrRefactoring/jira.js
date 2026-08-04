import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { AvatarUrlsSchema } from './avatarUrls';
import { UpdatedProjectCategorySchema } from './updatedProjectCategory';
/** Details about a project. */

export const ProjectDetailsSchema = apiObject({
  avatarUrls: AvatarUrlsSchema.optional(),
  /** The ID of the project. */
  id: z.string().optional(),
  /** The key of the project. */
  key: z.string().optional(),
  /** The name of the project. */
  name: z.string().optional(),
  projectCategory: UpdatedProjectCategorySchema.optional(),
  /**
   * The [project
   * type](https://confluence.atlassian.com/x/GwiiLQ#Jiraapplicationsoverview-Productfeaturesandprojecttypes) of the
   * project.
   */
  projectTypeKey: openEnum([
    'software',
    'service_desk',
    'business',
    'product_discovery',
    'customer_service',
  ]).optional(),
  /** The URL of the project details. */
  self: z.string().optional(),
  /** Whether or not the project is simplified. */
  simplified: z.boolean().optional(),
});

export type ProjectDetails = z.infer<typeof ProjectDetailsSchema>;
