import { z } from 'zod';

/** Details of a context to project association. */
export const CustomFieldContextProjectMappingSchema = z.object({
  /** The ID of the context. */
  contextId: z.string(),
  /** Whether context is global. */
  isGlobalContext: z.boolean().optional(),
  /** The ID of the project. */
  projectId: z.string().optional(),
});

export type CustomFieldContextProjectMapping = z.infer<typeof CustomFieldContextProjectMappingSchema>;
