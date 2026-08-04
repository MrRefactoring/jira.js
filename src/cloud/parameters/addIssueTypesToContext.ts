import { z } from 'zod';
import { IssueTypeIdsSchema } from '../models';

export const AddIssueTypesToContextSchema = z
  .object({
    /** The ID of the custom field. */
    fieldId: z.string(),
    /** The ID of the context. */
    contextId: z.number(),
  })
  .extend(IssueTypeIdsSchema.shape);

export type AddIssueTypesToContext = z.input<typeof AddIssueTypesToContextSchema>;
