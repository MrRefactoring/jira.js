import { z } from 'zod';

export const GetUserEmailParametersSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * `5b10ac8d82e05b22cc7d4ef5`.
   */
  accountId: z.string(),
});

export type GetUserEmailParameters = z.infer<typeof GetUserEmailParametersSchema>;
