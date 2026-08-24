import { z } from 'zod';

export const GetProjectTypeByKeySchema = z.object({
  /** The key of the project type */
  projectTypeKey: z.string(),
});

export type GetProjectTypeByKey = z.input<typeof GetProjectTypeByKeySchema>;
