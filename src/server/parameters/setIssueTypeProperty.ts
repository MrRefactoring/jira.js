import { z } from 'zod';

export const SetIssueTypePropertySchema = z.object({
  /** The key of the issue type's property. The maximum length of the key is 255 bytes */
  propertyKey: z.string().max(255, 'propertyKey must be at most 255 characters'),
  /** The issue type on which the property will be set. */
  issueTypeId: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetIssueTypeProperty = z.input<typeof SetIssueTypePropertySchema>;
