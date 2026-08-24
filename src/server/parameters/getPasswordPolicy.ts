import { z } from 'zod';

export const GetPasswordPolicySchema = z.object({
  /**
   * Whether or not the user will be required to enter their current password. Use false (the default) if this is a new
   * user or if an administrator is forcibly changing another user's password.
   */
  hasOldPassword: z.boolean().optional(),
});

export type GetPasswordPolicy = z.input<typeof GetPasswordPolicySchema>;
