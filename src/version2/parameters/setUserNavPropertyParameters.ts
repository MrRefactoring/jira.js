import { z } from 'zod';

export const SetUserNavPropertyParametersSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().optional(),
  /** The key of the nav property. The maximum length is 255 characters. */
  propertyKey: z.string(),
});

export type SetUserNavPropertyParameters = z.infer<typeof SetUserNavPropertyParametersSchema>;
