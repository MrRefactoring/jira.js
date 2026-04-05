import { z } from 'zod';

export const GetIssuePropertySchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetIssueProperty = z.input<typeof GetIssuePropertySchema>;
