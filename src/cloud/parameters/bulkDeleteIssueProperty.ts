import { z } from 'zod';
import { IssueFilterForBulkPropertyDeleteSchema } from '../models';

export const BulkDeleteIssuePropertySchema = z.object(IssueFilterForBulkPropertyDeleteSchema.shape).extend({
  /** The key of the property. */
  propertyKey: z.string(),
});

export type BulkDeleteIssueProperty = z.input<typeof BulkDeleteIssuePropertySchema>;
