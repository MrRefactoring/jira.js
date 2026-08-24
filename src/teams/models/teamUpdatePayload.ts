import { z } from 'zod';
import { apiObject } from '#/core';

export const TeamUpdatePayloadSchema = apiObject({
  description: z.string().max(360, 'description must be at most 360 characters').nullish(),
  displayName: z.string().max(250, 'displayName must be at most 250 characters').nullish(),
});

export type TeamUpdatePayload = z.infer<typeof TeamUpdatePayloadSchema>;
