import { z } from 'zod';

export const GetDeploymentByKeySchema = z.object({
  /** The ID of the deployment's pipeline. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
  /** The ID of the deployment's environment. */
  environmentId: z.string().max(255, 'environmentId must be at most 255 characters'),
  /** The deployment's deploymentSequenceNumber. */
  deploymentSequenceNumber: z.number(),
});

export type GetDeploymentByKey = z.input<typeof GetDeploymentByKeySchema>;
