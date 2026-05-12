import { z } from 'zod';

export const DeleteIssuePropertySchema = z.object({
  /** The key or ID of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteIssueProperty = z.input<typeof DeleteIssuePropertySchema>;
