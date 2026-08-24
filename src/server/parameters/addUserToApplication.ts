import { z } from 'zod';

export const AddUserToApplicationSchema = z.object({
  /** Application key */
  applicationKey: z.string().optional(),
  /** Username */
  username: z.string().optional(),
});

export type AddUserToApplication = z.input<typeof AddUserToApplicationSchema>;
