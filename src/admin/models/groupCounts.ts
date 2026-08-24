import { z } from 'zod';
import { apiObject } from '#/core';
/** The number of objects associated with the group. */

export const GroupCountsSchema = apiObject({
  /** The number of users that belong to the group. */
  users: z.number().optional(),
  /** The number of resources the group has roles assigned to, linked to the directories the requestor can manage. */
  resources: z.number().optional(),
});

export type GroupCounts = z.infer<typeof GroupCountsSchema>;
