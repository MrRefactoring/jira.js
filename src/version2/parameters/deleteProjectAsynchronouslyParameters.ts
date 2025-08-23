import { z } from 'zod';

export const DeleteProjectAsynchronouslyParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type DeleteProjectAsynchronouslyParameters = z.infer<typeof DeleteProjectAsynchronouslyParametersSchema>;
