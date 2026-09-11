import { z } from 'zod';
import { apiObject } from '#/core';

export const ShareSchema = apiObject({
  emails: z.array(z.string()).optional(),
  jql: z.string().optional(),
  message: z.string().optional(),
  usernames: z.array(z.string()).optional(),
});

export type Share = z.infer<typeof ShareSchema>;
