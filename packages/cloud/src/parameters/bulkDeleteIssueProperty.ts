import { z } from 'zod';
import { IssueFilterForBulkPropertyDeleteSchema } from '../models';

export const BulkDeleteIssuePropertySchema = z
  .object({
    /** The key of the property. */
    propertyKey: z.string(),
  })
  .extend(IssueFilterForBulkPropertyDeleteSchema.shape);

export type BulkDeleteIssueProperty = z.input<typeof BulkDeleteIssuePropertySchema>;
