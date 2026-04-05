import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** Data related to a single build* */
export const GetBuildByKeySchema = z.object({
  /**
   * The schema version used for this data.
   *
   * Placeholder to support potential schema changes in the future.
   */
  schemaVersion: z.enum(['1.0']).optional(),
  /**
   * An ID that relates a sequence of builds. Depending on your use case this might be a project ID, pipeline ID, plan
   * key etc. - whatever logical unit you use to group a sequence of builds.
   *
   * The combination of `pipelineId` and `buildNumber` must uniquely identify a build you have provided.
   */
  pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
  /**
   * Identifies a build within the sequence of builds identified by the build `pipelineId`.
   *
   * Used to identify the 'most recent' build in that sequence of builds.
   *
   * The combination of `pipelineId` and `buildNumber` must uniquely identify a build you have provided.
   */
  buildNumber: z.number(),
  /**
   * A number used to apply an order to the updates to the build, as identified by `pipelineId` and `buildNumber`, in
   * the case of out-of-order receipt of update requests.
   *
   * It must be a monotonically increasing number. For example, epoch time could be one way to generate the
   * `updateSequenceNumber`.
   *
   * Updates for a build that is received with an `updateSqeuenceNumber` less than or equal to what is currently stored
   * will be ignored.
   */
  updateSequenceNumber: z.number(),
  /**
   * The human-readable name for the build.
   *
   * Will be shown in the UI.
   */
  displayName: z.string().max(255, 'displayName must be at most 255 characters'),
  /**
   * An optional description to attach to this build.
   *
   * This may be anything that makes sense in your system.
   */
  description: z.string().max(255, 'description must be at most 255 characters').optional(),
  /** A human-readable string that to provide information about the build. */
  label: z.string().max(255, 'label must be at most 255 characters').optional(),
  /** The URL to this build in your system. */
  url: z.string().max(2000, 'url must be at most 2000 characters'),
  /**
   * The state of a build.
   *
   * - `pending` - The build is queued, or some manual action is required.
   * - `in_progress` - The build is currently running.
   * - `successful` - The build completed successfully.
   * - `failed` - The build failed.
   * - `cancelled` - The build has been cancelled or stopped.
   * - `unknown` - The build is in an unknown state.
   */
  state: z.enum(['pending', 'in_progress', 'successful', 'failed', 'cancelled', 'unknown']),
  /** The last-updated timestamp to present to the user as a summary of the state of the build. */
  lastUpdated: z.string().transform(s => new Date(s)),
  /** The Jira issue keys or IDs to associate the build with. */
  associations: z.array(IssueIdOrKeysAssociationSchema).optional(),
  /** Information about tests that were executed during a build. */
  testInfo: z
    .object({
      /** The total number of tests considered during a build. */
      totalNumber: z.number(),
      /** The number of tests that passed during a build. */
      numberPassed: z.number(),
      /** The number of tests that failed during a build. */
      numberFailed: z.number(),
      /** The number of tests that were skipped during a build. */
      numberSkipped: z.number().optional(),
    })
    .optional(),
  /** Optional information that links a build to a commit, branch etc. */
  references: z
    .array(
      z.object({
        /** Details about the commit the build was run against. */
        commit: z
          .object({
            /** The ID of the commit. E.g. for a Git repository this would be the SHA1 hash. */
            id: z.string().max(255, 'id must be at most 255 characters'),
            /**
             * An identifier for the repository containing the commit.
             *
             * In most cases this should be the URL of the repository in the SCM provider.
             *
             * For cases where the build was executed against a local repository etc. this should be some identifier
             * that is unique to that repository.
             */
            repositoryUri: z.string().max(2000, 'repositoryUri must be at most 2000 characters'),
          })
          .optional(),
        /** Details about the ref the build was run on. */
        ref: z
          .object({
            /** The name of the ref the build ran on */
            name: z.string().max(255, 'name must be at most 255 characters'),
            /**
             * An identifer for the ref.
             *
             * In most cases this should be the URL of the tag/branch etc. in the SCM provider.
             *
             * For cases where the build was executed against a local repository etc. this should be something that
             * uniquely identifies the ref.
             */
            uri: z.string().max(2000, 'uri must be at most 2000 characters'),
          })
          .optional(),
      }),
    )
    .optional(),
});

export type GetBuildByKey = z.infer<typeof GetBuildByKeySchema>;
