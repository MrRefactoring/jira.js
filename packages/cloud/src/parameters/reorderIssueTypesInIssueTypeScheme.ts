import { z } from 'zod';
import { OrderOfIssueTypesSchema } from '../models';

export const ReorderIssueTypesInIssueTypeSchemeSchema = z
  .object({
    /** The ID of the issue type scheme. */
    issueTypeSchemeId: z.number(),
  })
  .extend(OrderOfIssueTypesSchema.shape);

export type ReorderIssueTypesInIssueTypeScheme = z.input<typeof ReorderIssueTypesInIssueTypeSchemeSchema>;
