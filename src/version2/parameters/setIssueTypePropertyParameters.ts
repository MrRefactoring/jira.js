import { z } from 'zod';

export const SetIssueTypePropertyParametersSchema = z.object({
  /** The ID of the issue type. */
  issueTypeId: z.string(),
  /** The key of the issue type property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetIssueTypePropertyParameters = z.infer<typeof SetIssueTypePropertyParametersSchema>;
