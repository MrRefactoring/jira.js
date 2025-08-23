import { z } from 'zod';

export const GetIssueTypeParametersSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
});

export type GetIssueTypeParameters = z.infer<typeof GetIssueTypeParametersSchema>;
