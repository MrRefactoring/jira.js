import { z } from 'zod';

export const GetWorklogPropertyParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetWorklogPropertyParameters = z.infer<typeof GetWorklogPropertyParametersSchema>;
