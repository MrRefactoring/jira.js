import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';

export const VoteSchema = apiObject({
  self: z.string().optional(),
  votes: z.number().optional(),
  hasVoted: z.boolean().optional(),
  voters: z.array(UserJsonSchema).optional(),
});

export type Vote = z.infer<typeof VoteSchema>;
