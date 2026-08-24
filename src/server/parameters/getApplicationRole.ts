import { z } from 'zod';

export const GetApplicationRoleSchema = z.object({
  /** The key of the role to use. */
  key: z.string(),
});

export type GetApplicationRole = z.input<typeof GetApplicationRoleSchema>;
