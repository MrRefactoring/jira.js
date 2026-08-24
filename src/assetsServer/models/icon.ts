import { z } from 'zod';
import { apiObject } from '#/core';

export const IconSchema = apiObject({
  expand: z.string().optional(),
  project: z.string().optional(),
  position: z.string().optional(),
  after: z.string().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  url16: z.string().optional(),
  url48: z.string().optional(),
});

export type Icon = z.infer<typeof IconSchema>;
