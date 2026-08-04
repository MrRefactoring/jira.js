import { z } from 'zod';
import { apiObject } from '#/core';

export const SimplifiedHierarchyLevelSchema = apiObject({
  hierarchyLevelNumber: z.number().optional(),
  /** The issue types available in this hierarchy level. */
  issueTypeIds: z.array(z.number()).optional(),
  /** The level of this item in the hierarchy. */
  level: z.number().optional(),
  /** The name of this hierarchy level. */
  name: z.string().optional(),
});

export type SimplifiedHierarchyLevel = z.infer<typeof SimplifiedHierarchyLevelSchema>;
