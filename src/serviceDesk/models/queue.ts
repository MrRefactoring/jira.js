import { z } from 'zod';
import { apiObject } from '#/core';
import { SelfLinkSchema } from './selfLink';

export const QueueSchema = apiObject({
  _links: SelfLinkSchema.optional(),
  /** Fields returned for each request in the queue. */
  fields: z.array(z.string()).optional(),
  /** ID for the queue. */
  id: z.string().optional(),
  /** The count of customer requests in the queue. */
  issueCount: z.number().optional(),
  /** JQL query that filters reqeusts for the queue. */
  jql: z.string().optional(),
  /** Short name for the queue. */
  name: z.string().optional(),
});

export type Queue = z.infer<typeof QueueSchema>;
