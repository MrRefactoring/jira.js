import { z } from 'zod';
import { apiObject } from '#/core';
import { ClusterLockStatusSchema } from './clusterLockStatus';

export const ClusterLockStatusesSchema = apiObject({
  clusterLocks: z.array(ClusterLockStatusSchema).optional(),
});

export type ClusterLockStatuses = z.infer<typeof ClusterLockStatusesSchema>;
