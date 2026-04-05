import { z } from 'zod';

export const GetAllStatusesSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetAllStatuses = z.input<typeof GetAllStatusesSchema>;
