import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const QueueSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  jql: z.string().optional(),
  fields: z.array(z.string()).optional(),
  issueCount: z.number().optional(),
  _links: SelfLinkSchema.optional(),
});

export type Queue = z.infer<typeof QueueSchema>;
