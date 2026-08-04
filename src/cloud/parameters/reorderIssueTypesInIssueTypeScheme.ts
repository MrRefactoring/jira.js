import { z } from 'zod';
import { OrderOfIssueTypesSchema } from '../models';

export const ReorderIssueTypesInIssueTypeSchemeSchema = z.object({}).extend(OrderOfIssueTypesSchema.shape).extend({
  /** The ID of the issue type scheme. */
  issueTypeSchemeId: z.number(),
});

export type ReorderIssueTypesInIssueTypeScheme = z.input<typeof ReorderIssueTypesInIssueTypeSchemeSchema>;
