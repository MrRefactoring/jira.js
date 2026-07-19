import { z } from 'zod';
import { apiObject } from '#/core';
/**
 * The JQL query to sanitize for the account ID. If the account ID is null, sanitizing is performed for an anonymous
 * user.
 */

export const JqlQueryToSanitizeSchema = apiObject({
  /**
   * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
   * _5b10ac8d82e05b22cc7d4ef5_.
   */
  accountId: z.string().max(128, 'accountId must be at most 128 characters').nullish(),
  /** The query to sanitize. */
  query: z.string(),
});

export type JqlQueryToSanitize = z.infer<typeof JqlQueryToSanitizeSchema>;
