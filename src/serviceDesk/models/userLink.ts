import { z } from 'zod';
import { apiObject } from '#/core';

export const UserLinkSchema = apiObject({
  /**
   * Links to the various sizes of the customer's avatar. Note that this property is deprecated, and will be removed in
   * future versions.
   */
  avatarUrls: z.record(z.string(), z.any()).optional(),
  /** REST API URL for the customer. */
  jiraRest: z.url().optional(),
  self: z.url().optional(),
});

export type UserLink = z.infer<typeof UserLinkSchema>;
