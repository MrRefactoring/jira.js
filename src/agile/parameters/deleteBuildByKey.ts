import { z } from 'zod';

export const DeleteBuildByKeySchema = z.object({
  /** The `pipelineId` of the build to delete. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
  /** The `buildNumber` of the build to delete. */
  buildNumber: z.number(),
});

export type DeleteBuildByKey = z.input<typeof DeleteBuildByKeySchema>;
