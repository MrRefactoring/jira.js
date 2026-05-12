import { z } from 'zod';
import { ProjectDetailsSchema } from '#/models/projectDetails';

/**
 * The projects the item is associated with. Indicated for items associated with [next-gen
 * projects](https://confluence.atlassian.com/x/loMyO).
 */
export const ScopeSchema = z.object({
  project: ProjectDetailsSchema.optional(),
  /** The type of scope. */
  type: z.enum(['PROJECT', 'TEMPLATE']).optional(),
});

export type Scope = z.infer<typeof ScopeSchema>;
