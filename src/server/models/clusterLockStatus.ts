import { z } from 'zod';
import { apiObject } from '#/core';

export const ClusterLockStatusSchema = apiObject({
  holdingLockSec: z.string().optional(),
  lockName: z.string().optional(),
  lockedByNode: z.string().optional(),
  updateTime: z.string().optional(),
});

export type ClusterLockStatus = z.infer<typeof ClusterLockStatusSchema>;
