import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
import { NodeBuildInfoSchema } from './nodeBuildInfo';

export const ClusterStateSchema = apiObject({
  build: NodeBuildInfoSchema.optional(),
  state: openEnum([
    'STABLE',
    'READY_TO_UPGRADE',
    'MIXED',
    'READY_TO_RUN_UPGRADE_TASKS',
    'RUNNING_UPGRADE_TASKS',
    'UPGRADE_TASKS_FAILED',
  ]).optional(),
});

export type ClusterState = z.infer<typeof ClusterStateSchema>;
