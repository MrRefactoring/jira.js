import { z } from 'zod';
import { apiObject } from '#/core';

export const UserLinkSchema = apiObject({
  jiraRest: z.url().optional(),
  avatarUrls: z.record(z.string(), z.any()).optional(),
  self: z.url().optional(),
});

export type UserLink = z.infer<typeof UserLinkSchema>;
