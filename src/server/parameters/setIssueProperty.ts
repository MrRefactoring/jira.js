import { z } from 'zod';

export const SetIssuePropertySchema = z.object({
  /** The key of the issue's property */
  propertyKey: z.string().max(255, 'propertyKey must be at most 255 characters'),
  /** Issue id or key */
  issueIdOrKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetIssueProperty = z.input<typeof SetIssuePropertySchema>;
