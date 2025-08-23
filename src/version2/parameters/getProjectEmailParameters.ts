import { z } from 'zod';

export const GetProjectEmailParametersSchema = z.object({
  /** The project ID. */
  projectId: z.number().int(),
});

export type GetProjectEmailParameters = z.infer<typeof GetProjectEmailParametersSchema>;
