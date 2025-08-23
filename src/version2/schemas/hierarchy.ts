import { z } from 'zod';
import { SimplifiedHierarchyLevelSchema } from './simplifiedHierarchyLevel';

/** The project issue type hierarchy. */
export const HierarchySchema = z.object({
  /**
   * The ID of the base level. This property is deprecated, see [Change notice: Removing hierarchy level IDs from
   * next-gen
   * APIs](https://developer.atlassian.com/cloud/jira/platform/change-notice-removing-hierarchy-level-ids-from-next-gen-apis/).
   */
  baseLevelId: z.number().int().optional(),
  /** Details about the hierarchy level. */
  levels: z.array(SimplifiedHierarchyLevelSchema).optional(),
});

export type Hierarchy = z.infer<typeof HierarchySchema>;
