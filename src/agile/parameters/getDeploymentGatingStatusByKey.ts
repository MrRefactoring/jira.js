import { z } from 'zod';

export const GetDeploymentGatingStatusByKeySchema = z.object({
  /** The ID of the Deployment's pipeline. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
  /** The ID of the Deployment's environment. */
  environmentId: z.string().max(255, 'environmentId must be at most 255 characters'),
  /** The Deployment's deploymentSequenceNumber. */
  deploymentSequenceNumber: z.number(),
});

export type GetDeploymentGatingStatusByKey = z.input<typeof GetDeploymentGatingStatusByKeySchema>;
