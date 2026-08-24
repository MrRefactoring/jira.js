import { z } from 'zod';
import { apiObject } from '#/core';

export const LinkSchema = apiObject({
  self: z.string().optional(),
});

export type Link = z.infer<typeof LinkSchema>;
