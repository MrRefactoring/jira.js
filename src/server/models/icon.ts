import { z } from 'zod';
import { apiObject } from '#/core';

export const IconSchema = apiObject({
  link: z.string().optional(),
  title: z.string().optional(),
  url16x16: z.string().optional(),
});

export type Icon = z.infer<typeof IconSchema>;
