import { z } from 'zod';

export const SetIssuePropertySchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the issue property. The maximum length is 255 characters. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetIssueProperty = z.input<typeof SetIssuePropertySchema>;
