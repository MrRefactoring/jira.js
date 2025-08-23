import { z } from 'zod';

export const SetIssuePropertyParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The key of the issue property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetIssuePropertyParameters = z.infer<typeof SetIssuePropertyParametersSchema>;
