import { z } from 'zod';

/**
 * Data related to a specific deployment in a specific environment that the deployment is present in.* Must specify one
 * of `issueKeys` or `associations`.*
 */
export const GetDeploymentByKeySchema = z.object({
  /**
   * This is the identifier for the deployment. It must be unique for the specified pipeline and environment. It must be
   * a monotonically increasing number, as this is used to sequence the deployments.
   */
  deploymentSequenceNumber: z.number(),
  /**
   * A number used to apply an order to the updates to the deployment, as identified by the deploymentSequenceNumber, in
   * the case of out-of-order receipt of update requests. It must be a monotonically increasing number. For example,
   * epoch time could be one way to generate the updateSequenceNumber.
   */
  updateSequenceNumber: z.number(),
  /** The entities to associate the Deployment information with. */
  associations: z.array(z.unknown()).optional(),
  /** The human-readable name for the deployment. Will be shown in the UI. */
  displayName: z.string().max(255, 'displayName must be at most 255 characters'),
  /** A URL users can use to link to this deployment, in this environment. */
  url: z.url().max(2000, 'url must be at most 2000 characters'),
  /** A short description of the deployment */
  description: z.string().max(255, 'description must be at most 255 characters'),
  /** The last-updated timestamp to present to the user as a summary of the state of the deployment. */
  lastUpdated: z.string().transform(s => new Date(s)),
  /**
   * An (optional) additional label that may be displayed with deployment information. Can be used to display version
   * information etc. for the deployment.
   */
  label: z.string().max(255, 'label must be at most 255 characters').optional(),
  /** The duration of the deployment (in seconds). */
  duration: z.number().optional(),
  /** The state of the deployment */
  state: z.enum(['unknown', 'pending', 'in_progress', 'cancelled', 'failed', 'rolled_back', 'successful']),
  /**
   * This object models the Continuous Delivery (CD) Pipeline concept, an automated process (usually comprised of
   * multiple stages)
   *
   * For getting software from version control right through to the production environment.
   */
  pipeline: z.object({
    /** The identifier of this pipeline, must be unique for the provider. */
    id: z.string().max(255, 'id must be at most 255 characters'),
    /** The name of the pipeline to present to the user. */
    displayName: z.string().max(255, 'displayName must be at most 255 characters'),
    /** A URL users can use to link to this deployment pipeline. */
    url: z.url().max(2000, 'url must be at most 2000 characters'),
  }),
  /** The environment that the deployment is present in. */
  environment: z.object({
    /** The identifier of this environment, must be unique for the provider so that it can be shared across pipelines. */
    id: z.string().max(255, 'id must be at most 255 characters'),
    /** The name of the environment to present to the user. */
    displayName: z.string().max(255, 'displayName must be at most 255 characters'),
    /** The type of the environment. */
    type: z.enum(['unmapped', 'development', 'testing', 'staging', 'production']),
  }),
  /** A list of commands to be actioned for this Deployment */
  commands: z
    .array(
      z.object({
        /** The command name. */
        command: z.string().optional(),
      }),
    )
    .optional(),
  /**
   * The DeploymentData schema version used for this deployment data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']).optional(),
});

export type GetDeploymentByKey = z.infer<typeof GetDeploymentByKeySchema>;
