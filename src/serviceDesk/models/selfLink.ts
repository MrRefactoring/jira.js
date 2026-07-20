import { z } from 'zod';
import { apiObject } from '#/core';

export const SelfLinkSchema = apiObject({
  self: z.url().optional(),
});

export type SelfLink = z.infer<typeof SelfLinkSchema>;
