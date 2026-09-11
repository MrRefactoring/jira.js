import { z } from 'zod';

export const GetAllStatusesSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetAllStatuses = z.input<typeof GetAllStatusesSchema>;
