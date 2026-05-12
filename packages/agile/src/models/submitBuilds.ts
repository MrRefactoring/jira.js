import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** The result of a successful `submitBuilds` request.* */
export const SubmitBuildsSchema = z.object({
  /**
   * The keys of builds that have been accepted for submission. A build key is a composite key that consists of
   * `pipelineId` and `buildNumber`.
   *
   * A build may be rejected if it was only associated with unknown issue keys, or if the submitted data for that build
   * does not match the required schema.
   *
   * Note that a build that isn't updated due to it's `updateSequenceNumber` being out of order is not considered a
   * failed submission.
   */
  acceptedBuilds: z
    .array(
      z.object({
        /**
         * An ID that relates a sequence of builds. Depending on your system this might be a project ID, pipeline ID,
         * plan key etc. - whatever logical unit you use to group a sequence of builds.
         *
         * The combination of `pipelineId` and `buildNumber` must uniquely identify the build.
         */
        pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
        /**
         * Identifies a build within the sequence of builds identified by the build `pipelineId`.
         *
         * Used to identify the 'most recent' build in that sequence of builds.
         *
         * The combination of `pipelineId` and `buildNumber` must uniquely identify the build.
         */
        buildNumber: z.number(),
      }),
    )
    .optional(),
  /**
   * Details of builds that have not been accepted for submission.
   *
   * A build may be rejected if it was only associated with unknown issue keys, or if the submitted data for the build
   * does not match the required schema.
   */
  rejectedBuilds: z
    .array(
      z.object({
        /** Fields that uniquely reference a build. */
        key: z.object({
          /**
           * An ID that relates a sequence of builds. Depending on your system this might be a project ID, pipeline ID,
           * plan key etc. - whatever logical unit you use to group a sequence of builds.
           *
           * The combination of `pipelineId` and `buildNumber` must uniquely identify the build.
           */
          pipelineId: z.string().max(255, 'pipelineId must be at most 255 characters'),
          /**
           * Identifies a build within the sequence of builds identified by the build `pipelineId`.
           *
           * Used to identify the 'most recent' build in that sequence of builds.
           *
           * The combination of `pipelineId` and `buildNumber` must uniquely identify the build.
           */
          buildNumber: z.number(),
        }),
        /** The error messages for the rejected build */
        errors: z.array(
          z.object({
            /** A human-readable message describing the error. */
            message: z.string(),
            /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
            errorTraceId: z.string().optional(),
          }),
        ),
      }),
    )
    .optional(),
  /**
   * Issue keys that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a build has been associated with issue keys other than those in this array it will still be stored against those
   * valid keys. If a build was only associated with issue keys deemed to be invalid it won't be persisted.
   */
  unknownIssueKeys: z.array(z.string()).optional(),
  /**
   * Associations that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a build has been associated with any other association other than those in this array it will still be stored
   * against those valid associations. If a build was only associated with the associations in this array, it is deemed
   * to be invalid and it won't be persisted.
   */
  unknownAssociations: z.array(IssueIdOrKeysAssociationSchema).optional(),
});

export type SubmitBuilds = z.infer<typeof SubmitBuildsSchema>;
