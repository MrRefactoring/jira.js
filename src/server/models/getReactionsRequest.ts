import { z } from 'zod';
import { apiObject } from '#/core';

export const GetReactionsRequestSchema = apiObject({
  commentIds: z.array(z.number()).optional(),
});

export type GetReactionsRequest = z.infer<typeof GetReactionsRequestSchema>;
