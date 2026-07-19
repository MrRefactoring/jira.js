import { z } from 'zod';
import { apiObject } from '#/core';
/** The current gating status for the given Deployment.* */

export const GetDeploymentGatingStatusByKeySchema = apiObject({
  /** This is the identifier for the Deployment. */
  deploymentSequenceNumber: z.number().optional(),
  /** The ID of the Deployment's pipeline. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters').optional(),
  /** The ID of the Deployment's environment. */
  environmentId: z.string().optional(),
  /** Time the deployment gating status was updated. */
  updatedTimestamp: z.coerce.date().optional(),
  /** The gating status */
  gatingStatus: z.enum(['allowed', 'prevented', 'awaiting', 'invalid']).optional(),
  details: z
    .array(
      apiObject({
        /** The type of the gating status details. */
        type: z.enum(['issue']),
        /** An issue key that references an issue in Jira. */
        issueKey: z.string(),
        /**
         * A full HTTPS link to the Jira issue for the change request gating this Deployment. This field is provided if
         * the details type is issue.
         */
        issueLink: z.string().url().max(2000, 'issueLink must be at most 2000 characters'),
      }),
    )
    .optional(),
});

export type GetDeploymentGatingStatusByKey = z.infer<typeof GetDeploymentGatingStatusByKeySchema>;
