import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const GroupAssignmentResultSchema = apiObject({
  /** The groupId for which the group assignment was attempted. */
  group: z.string().optional(),
  /** The status of the group assignment attempt. */
  status: openEnum(['INVITED', 'ERROR']).optional(),
  /** If status is ERROR, this field contains the reason for the failure. */
  statusReason: z.string().nullish(),
});

export type GroupAssignmentResult = z.infer<typeof GroupAssignmentResultSchema>;
