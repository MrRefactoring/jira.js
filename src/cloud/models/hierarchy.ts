import { z } from 'zod';
import { apiObject } from '#/core';
import { SimplifiedHierarchyLevelSchema } from './simplifiedHierarchyLevel';
/** The project issue type hierarchy. */

export const HierarchySchema = apiObject({
  /** Details about the hierarchy level. */
  levels: z.array(SimplifiedHierarchyLevelSchema).optional(),
});

export type Hierarchy = z.infer<typeof HierarchySchema>;
