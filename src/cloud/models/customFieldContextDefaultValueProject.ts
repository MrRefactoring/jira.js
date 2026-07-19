import { z } from 'zod';
import { apiObject } from '#/core';
/** The default value for a project custom field. */

export const CustomFieldContextDefaultValueProjectSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default project. */
  projectId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueProject = z.infer<typeof CustomFieldContextDefaultValueProjectSchema>;
