import { z } from 'zod';

export const SetWorklogPropertyParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
  /** The key of the issue property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetWorklogPropertyParameters = z.infer<typeof SetWorklogPropertyParametersSchema>;
