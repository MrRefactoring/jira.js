import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const RemoveIssueTypesFromContextSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(IssueTypeIdsSchema.shape);

export type RemoveIssueTypesFromContext = z.input<typeof RemoveIssueTypesFromContextSchema>;
