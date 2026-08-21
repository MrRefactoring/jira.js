import { z } from 'zod';

export const DeleteIssuePropertySchema = z.object({
  /** The key of the property to remove */
  propertyKey: z.string(),
  /** Issue id or key */
  issueIdOrKey: z.string(),
});

export type DeleteIssueProperty = z.input<typeof DeleteIssuePropertySchema>;
