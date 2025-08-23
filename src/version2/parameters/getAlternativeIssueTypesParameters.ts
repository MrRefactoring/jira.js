import { z } from 'zod';

export const GetAlternativeIssueTypesParametersSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
});

export type GetAlternativeIssueTypesParameters = z.infer<typeof GetAlternativeIssueTypesParametersSchema>;
