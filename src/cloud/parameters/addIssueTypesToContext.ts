import { z } from 'zod';
import { AddIssueTypesToContextSchema as AddIssueTypesToContextModelSchema } from '../models';

export const AddIssueTypesToContextSchema = z.object(AddIssueTypesToContextModelSchema.shape).extend({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number(),
});

export type AddIssueTypesToContext = z.input<typeof AddIssueTypesToContextSchema>;
