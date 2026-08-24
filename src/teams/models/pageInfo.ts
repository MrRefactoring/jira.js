import { z } from 'zod';
import { apiObject } from '#/core';

export const PageInfoSchema = apiObject({
  endCursor: z.string().nullish(),
  hasNextPage: z.boolean(),
});

export type PageInfo = z.infer<typeof PageInfoSchema>;
