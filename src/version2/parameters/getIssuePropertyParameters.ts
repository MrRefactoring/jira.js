import { z } from 'zod';

export const GetIssuePropertyParametersSchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetIssuePropertyParameters = z.infer<typeof GetIssuePropertyParametersSchema>;
