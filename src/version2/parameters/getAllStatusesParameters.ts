import { z } from 'zod';

export const GetAllStatusesParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetAllStatusesParameters = z.infer<typeof GetAllStatusesParametersSchema>;
