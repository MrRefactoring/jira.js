import { z } from 'zod';
import { apiObject } from '#/core';
/** Management access for the group. This is used to determine if the group can be deleted, modified, or read. */

export const ManagementAccessSchema = apiObject({
  /** If true, the group can be deleted. */
  deletable: z.boolean().optional(),
  /** If true, the group can be modified. */
  modifiable: z.boolean().optional(),
  /** If true, the group can be read. */
  readable: z.boolean().optional(),
});

export type ManagementAccess = z.infer<typeof ManagementAccessSchema>;
