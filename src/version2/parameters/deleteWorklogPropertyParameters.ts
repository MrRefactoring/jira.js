import { z } from 'zod';

export const DeleteWorklogPropertyParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type DeleteWorklogPropertyParameters = z.infer<typeof DeleteWorklogPropertyParametersSchema>;
