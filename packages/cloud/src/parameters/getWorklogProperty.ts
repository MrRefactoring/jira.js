import { z } from 'zod';

export const GetWorklogPropertySchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The ID of the worklog. */
  worklogId: z.string(),
  /** The key of the property. */
  propertyKey: z.string(),
});

export type GetWorklogProperty = z.input<typeof GetWorklogPropertySchema>;
