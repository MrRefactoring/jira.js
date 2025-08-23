import { z } from 'zod';

export const DeleteIssueTypeParametersSchema = z.object({
  /** The ID of the issue type. */
  id: z.string(),
  /** The ID of the replacement issue type. */
  alternativeIssueTypeId: z.string().optional(),
});

export type DeleteIssueTypeParameters = z.infer<typeof DeleteIssueTypeParametersSchema>;
