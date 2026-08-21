import { z } from 'zod';

export const GetIssuePropertySchema = z.object({
  /** The key of the property to return */
  propertyKey: z.string(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type GetIssueProperty = z.input<typeof GetIssuePropertySchema>;
