import { z } from 'zod';

/**
 * The projects the item is associated with. Indicated for items associated with [next-gen
 * projects](https://confluence.atlassian.com/x/loMyO).
 */
export const ScopeSchema = z.object({
  /** The project the item has scope in. */
  project: z.unknown().optional(),
  /** The type of scope. */
  type: z.enum(['PROJECT', 'TEMPLATE']).optional(),
});

export type Scope = z.infer<typeof ScopeSchema>;
