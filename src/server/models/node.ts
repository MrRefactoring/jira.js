import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const NodeSchema = apiObject({
  alive: z.boolean().optional(),
  cacheListenerPort: z.number().optional(),
  ip: z.string().optional(),
  lastStateChangeTimestamp: z.number().optional(),
  nodeBuildNumber: z.number().optional(),
  nodeId: z.string().optional(),
  nodeVersion: z.string().optional(),
  state: openEnum(['ACTIVE', 'PASSIVE', 'ACTIVATING', 'PASSIVATING', 'OFFLINE']).optional(),
});

export type Node = z.infer<typeof NodeSchema>;
