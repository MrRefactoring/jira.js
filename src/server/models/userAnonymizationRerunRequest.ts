import { z } from 'zod';
import { apiObject } from '#/core';

export const UserAnonymizationRerunRequestSchema = apiObject({
  newOwnerKey: z.string().optional(),
  oldUserKey: z.string().optional(),
  oldUserName: z.string().optional(),
  userKey: z.string().optional(),
});

export type UserAnonymizationRerunRequest = z.infer<typeof UserAnonymizationRerunRequestSchema>;
