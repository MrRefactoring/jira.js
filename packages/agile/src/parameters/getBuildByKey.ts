import { z } from 'zod';

export const GetBuildByKeySchema = z.object({
  /** The `pipelineId` of the build. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
  /** The `buildNumber` of the build. */
  buildNumber: z.number(),
});

export type GetBuildByKey = z.input<typeof GetBuildByKeySchema>;
