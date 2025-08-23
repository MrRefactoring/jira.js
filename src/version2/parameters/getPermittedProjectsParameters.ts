import { z } from 'zod';

export const GetPermittedProjectsParametersSchema = z.object({
  /** A list of permission keys. */
  permissions: z.array(z.string()),
});

export type GetPermittedProjectsParameters = z.infer<typeof GetPermittedProjectsParametersSchema>;
