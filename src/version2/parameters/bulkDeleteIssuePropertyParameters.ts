import { z } from 'zod';

export const BulkDeleteIssuePropertyParametersSchema = z.object({
  /** The key of the property. */
  propertyKey: z.string(),
  /** The value of properties to perform the bulk operation on. */
  currentValue: z.unknown().optional(),
  /** List of issues to perform the bulk delete operation on. */
  entityIds: z.array(z.number().int()).optional(),
});

export type BulkDeleteIssuePropertyParameters = z.infer<typeof BulkDeleteIssuePropertyParametersSchema>;
