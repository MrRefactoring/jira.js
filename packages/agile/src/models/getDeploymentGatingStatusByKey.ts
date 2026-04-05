import { z } from 'zod';

/** The current gating status for the given Deployment.* */
export const GetDeploymentGatingStatusByKeySchema = z.object({
  /** This is the identifier for the Deployment. */
  deploymentSequenceNumber: z.number().optional(),
  /** The ID of the Deployment's pipeline. */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters').optional(),
  /** The ID of the Deployment's environment. */
  environmentId: z.string().optional(),
  /** Time the deployment gating status was updated. */
  updatedTimestamp: z
    .string()
    .transform(s => new Date(s))
    .optional(),
  /** The gating status */
  gatingStatus: z.enum(['allowed', 'prevented', 'awaiting', 'invalid']).optional(),
  details: z
    .array(
      z.object({
        /** The type of the gating status details. */
        type: z.enum(['issue']),
        /** An issue key that references an issue in Jira. */
        issueKey: z.string(),
        /**
         * A full HTTPS link to the Jira issue for the change request gating this Deployment. This field is provided if
         * the details type is issue.
         */
        issueLink: z.url().max(2000, 'issueLink must be at most 2000 characters'),
      }),
    )
    .optional(),
});

export type GetDeploymentGatingStatusByKey = z.infer<typeof GetDeploymentGatingStatusByKeySchema>;
