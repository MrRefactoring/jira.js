import { z } from 'zod';
import { BulkIssuePropertyUpdateRequestSchema } from '../models';

export const BulkSetIssuePropertySchema = z.object({}).extend(BulkIssuePropertyUpdateRequestSchema.shape).extend({
  /** The key of the property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type BulkSetIssueProperty = z.input<typeof BulkSetIssuePropertySchema>;
