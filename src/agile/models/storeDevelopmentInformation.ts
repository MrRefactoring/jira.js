import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** The result of a successful store development information request */
export const StoreDevelopmentInformationSchema = apiObject({
  /**
   * The IDs of devinfo entities that have been accepted for submission grouped by their repository IDs. Note that a
   * devinfo entity that isn't updated due to it's updateSequenceId being out of order is not considered a failed
   * submission.
   */
  acceptedDevinfoEntities: z
    .record(
      z.string(),
      apiObject({
        /** Commits IDs */
        commits: z.array(z.string()).optional(),
        /** Branch IDs */
        branches: z.array(z.string()).optional(),
        /** Pull request IDs */
        pullRequests: z.array(z.string()).optional(),
      }),
    )
    .optional(),
  /**
   * IDs of devinfo entities that have not been accepted for submission and caused error descriptions, usually due to a
   * problem with the request data. The entities (if present) will be grouped by their repository id and type. Entity
   * IDs are listed with errors associated with that devinfo entity that have prevented it being submitted.
   */
  failedDevinfoEntities: z
    .record(
      z.string(),
      apiObject({
        /** Repository errors */
        errorMessages: z
          .array(
            apiObject({
              /** A human-readable message describing the error. */
              message: z.string(),
              /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
              errorTraceId: z.string().optional(),
            }),
          )
          .optional(),
        /** Commits errors */
        commits: z
          .array(
            apiObject({
              /** Entity id */
              id: z.string(),
              /** Error message */
              errorMessages: z
                .array(
                  apiObject({
                    /** A human-readable message describing the error. */
                    message: z.string(),
                    /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
                    errorTraceId: z.string().optional(),
                  }),
                )
                .optional(),
            }),
          )
          .optional(),
        /** Branches errors */
        branches: z
          .array(
            apiObject({
              /** Entity id */
              id: z.string(),
              /** Error message */
              errorMessages: z
                .array(
                  apiObject({
                    /** A human-readable message describing the error. */
                    message: z.string(),
                    /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
                    errorTraceId: z.string().optional(),
                  }),
                )
                .optional(),
            }),
          )
          .optional(),
        /** Pull requests errors */
        pullRequests: z
          .array(
            apiObject({
              /** Entity id */
              id: z.string(),
              /** Error message */
              errorMessages: z
                .array(
                  apiObject({
                    /** A human-readable message describing the error. */
                    message: z.string(),
                    /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
                    errorTraceId: z.string().optional(),
                  }),
                )
                .optional(),
            }),
          )
          .optional(),
      }),
    )
    .optional(),
  /**
   * Issue keys that are not known on this Jira instance (if any). These may be invalid keys (e.g. `UTF-8` is sometimes
   * incorrectly identified as a Jira issue key), or they may be for projects that no longer exist. If a devinfo entity
   * has been associated with issue keys other than those in this array it will still be stored against those valid
   * keys.
   */
  unknownIssueKeys: z.array(z.string()).optional(),
  /**
   * Associations that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a development information entity has been associated with any other association other than those in this array
   * it will still be stored against those valid associations. If a development information entity was only associated
   * with the associations in this array, it is deemed to be invalid and it won't be persisted.
   */
  unknownAssociations: z.array(IssueIdOrKeysAssociationSchema).optional(),
});

export type StoreDevelopmentInformation = z.infer<typeof StoreDevelopmentInformationSchema>;
