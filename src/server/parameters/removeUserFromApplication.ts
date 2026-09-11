import { z } from 'zod';

export const RemoveUserFromApplicationSchema = z.object({
  /** Application key */
  applicationKey: z.string().optional(),
  /** Username */
  username: z.string().optional(),
});

export type RemoveUserFromApplication = z.input<typeof RemoveUserFromApplicationSchema>;
