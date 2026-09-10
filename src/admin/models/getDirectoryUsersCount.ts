import { z } from 'zod';
import { apiObject } from '#/core';

export const GetDirectoryUsersCountSchema = apiObject({
  /** The total number of users matching the criteria. */
  count: z.number().optional(),
});

export type GetDirectoryUsersCount = z.infer<typeof GetDirectoryUsersCountSchema>;
