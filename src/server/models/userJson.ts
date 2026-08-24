import { z } from 'zod';
import { apiObject } from '#/core';

export const UserJsonSchema = apiObject({
  active: z.boolean().optional(),
  avatarUrls: z.record(z.string(), z.any()).optional(),
  displayName: z.string().optional(),
  emailAddress: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  timeZone: z.string().optional(),
});

export type UserJson = z.infer<typeof UserJsonSchema>;
