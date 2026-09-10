import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const RoleAssignmentResultSchema = apiObject({
  /** The resource ARI for the product which the role assignment was attempted. */
  resource: z.string().optional(),
  /** The role which was attempted to be assigned. */
  role: z.string().optional(),
  /** The status of the role assignment attempt. */
  status: openEnum(['INVITED', 'ERROR']).optional(),
  /** If status is ERROR, this field contains the reason for the failure. */
  statusReason: z.string().nullish(),
});

export type RoleAssignmentResult = z.infer<typeof RoleAssignmentResultSchema>;
