import { z } from 'zod';

/** The default value for a project custom field. */
export const CustomFieldContextDefaultValueProjectSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** The ID of the default project. */
  projectId: z.string(),
  type: z.string(),
});

export type CustomFieldContextDefaultValueProject = z.infer<typeof CustomFieldContextDefaultValueProjectSchema>;
