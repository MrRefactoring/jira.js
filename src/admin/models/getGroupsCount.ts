import { z } from 'zod';
import { apiObject } from '#/core';

export const GetGroupsCountSchema = apiObject({
  /** The total number of groups matching the criteria. */
  count: z.number().optional(),
});

export type GetGroupsCount = z.infer<typeof GetGroupsCountSchema>;
