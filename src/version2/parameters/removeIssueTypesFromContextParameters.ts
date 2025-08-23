import { z } from 'zod';

export const RemoveIssueTypesFromContextParametersSchema = z.object({
  /** The ID of the custom field. */
  fieldId: z.string(),
  /** The ID of the context. */
  contextId: z.number().int(),
  /** The list of issue type IDs. */
  issueTypeIds: z.array(z.string()),
});

export type RemoveIssueTypesFromContextParameters = z.infer<typeof RemoveIssueTypesFromContextParametersSchema>;
