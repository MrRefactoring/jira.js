import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about a project type. */

export const ProjectTypeSchema = apiObject({
  /** The color of the project type. */
  color: z.string().optional(),
  /** The key of the project type's description. */
  descriptionI18nKey: z.string().optional(),
  /** The formatted key of the project type. */
  formattedKey: z.string().optional(),
  /** The icon of the project type. */
  icon: z.string().optional(),
  /** The key of the project type. */
  key: z.string().optional(),
});

export type ProjectType = z.infer<typeof ProjectTypeSchema>;
