import { z } from 'zod';

export const DeleteIssuePropertyParametersSchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteIssuePropertyParameters = z.infer<typeof DeleteIssuePropertyParametersSchema>;
