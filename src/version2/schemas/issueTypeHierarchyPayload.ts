import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for creating an issue type hierarchy */
export const IssueTypeHierarchyPayloadSchema = z.object({
  /** The hierarchy level of the issue type. 0, 1, 2, 3 .. n; Negative values for subtasks */
  hierarchyLevel: z.number().int().optional(),
  /** The name of the issue type */
  name: z.string().optional(),
  /**
   * The conflict strategy to use when the issue type already exists. FAIL - Fail execution, this always needs to be
   * unique; USE - Use the existing entity and ignore new entity parameters
   */
  onConflict: z.enum(['FAIL', 'USE', 'NEW']).optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
});

export type IssueTypeHierarchyPayload = z.infer<typeof IssueTypeHierarchyPayloadSchema>;
