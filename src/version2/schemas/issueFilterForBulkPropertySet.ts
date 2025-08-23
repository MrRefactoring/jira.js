import { z } from 'zod';

/** Bulk operation filter details. */
export const IssueFilterForBulkPropertySetSchema = z.object({
  /** The value of properties to perform the bulk operation on. */
  currentValue: z.unknown().optional(),
  /** List of issues to perform the bulk operation on. */
  entityIds: z.array(z.number().int()).optional(),
  /** Whether the bulk operation occurs only when the property is present on or absent from an issue. */
  hasProperty: z.boolean().optional(),
});

export type IssueFilterForBulkPropertySet = z.infer<typeof IssueFilterForBulkPropertySetSchema>;
