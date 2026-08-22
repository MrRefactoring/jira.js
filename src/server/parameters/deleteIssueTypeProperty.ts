import { z } from 'zod';

export const DeleteIssueTypePropertySchema = z.object({
  /** The key of the property to remove. */
  propertyKey: z.string(),
  /** The issue type from which the property will be removed. */
  issueTypeId: z.string(),
});

export type DeleteIssueTypeProperty = z.input<typeof DeleteIssueTypePropertySchema>;
