import { z } from 'zod';
import { apiObject } from '#/core';

export const UserAnonymizationRequestSchema = apiObject({
  newOwnerKey: z.string().optional(),
  userKey: z.string().optional(),
});

export type UserAnonymizationRequest = z.infer<typeof UserAnonymizationRequestSchema>;
