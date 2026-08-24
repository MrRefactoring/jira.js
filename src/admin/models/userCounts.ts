import { z } from 'zod';
import { apiObject } from '#/core';
/** The number of objects associated with the user. */

export const UserCountsSchema = apiObject({
  /** The number of resources the user has roles assigned to, linked to the directories the requestor can manage. */
  resources: z.number().optional(),
});

export type UserCounts = z.infer<typeof UserCountsSchema>;
