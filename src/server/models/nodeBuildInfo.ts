import { z } from 'zod';
import { apiObject } from '#/core';

export const NodeBuildInfoSchema = apiObject({
  buildNumber: z.number().optional(),
  version: z.string().optional(),
});

export type NodeBuildInfo = z.infer<typeof NodeBuildInfoSchema>;
