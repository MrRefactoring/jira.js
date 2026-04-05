import { z } from 'zod';
import { SimplifiedHierarchyLevelSchema } from '#/models/simplifiedHierarchyLevel';

/** The project issue type hierarchy. */
export const HierarchySchema = z.object({
  /** Details about the hierarchy level. */
  levels: z.array(SimplifiedHierarchyLevelSchema).optional(),
});

export type Hierarchy = z.infer<typeof HierarchySchema>;
