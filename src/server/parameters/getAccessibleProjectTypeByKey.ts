import { z } from 'zod';

export const GetAccessibleProjectTypeByKeySchema = z.object({
  /** The key of the project type */
  projectTypeKey: z.string(),
});

export type GetAccessibleProjectTypeByKey = z.input<typeof GetAccessibleProjectTypeByKeySchema>;
