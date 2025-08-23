import { z } from 'zod';

export const DeleteProjectParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /** Whether this project is placed in the Jira recycle bin where it will be available for restoration. */
  enableUndo: z.boolean().optional(),
});

export type DeleteProjectParameters = z.infer<typeof DeleteProjectParametersSchema>;
