import { z } from 'zod';

/** Bulk operation filter details. */
export const IssueFilterForBulkPropertyDeleteSchema = z.object({
  /** The value of properties to perform the bulk operation on. */
  currentValue: z.unknown().optional(),
  /** List of issues to perform the bulk delete operation on. */
  entityIds: z.array(z.number().int()).optional(),
});

export type IssueFilterForBulkPropertyDelete = z.infer<typeof IssueFilterForBulkPropertyDeleteSchema>;
