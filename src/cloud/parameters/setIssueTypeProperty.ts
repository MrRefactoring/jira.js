import { z } from 'zod';

export const SetIssueTypePropertySchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The key of the issue type property. The maximum length is 255 characters. */
  propertyKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type SetIssueTypeProperty = z.input<typeof SetIssueTypePropertySchema>;
