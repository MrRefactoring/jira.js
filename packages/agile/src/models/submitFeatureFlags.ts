import { z } from 'zod';
import { IssueIdOrKeysAssociationSchema } from './issueIdOrKeysAssociation';

/** The result of a successful submitFeatureFlags request.* */
export const SubmitFeatureFlagsSchema = z.object({
  /**
   * The IDs of Feature Flags that have been accepted for submission.
   *
   * A Feature Flag may be rejected if it was only associated with unknown issue keys.
   *
   * Note that a Feature Flag that isn't updated due to it's updateSequenceId being out of order is not considered a
   * failed submission.
   */
  acceptedFeatureFlags: z.array(z.string()).optional(),
  /**
   * Details of Feature Flags that have not been accepted for submission, usually due to a problem with the request
   * data.
   *
   * The object (if present) will be keyed by Feature Flag ID and include any errors associated with that Feature Flag
   * that have prevented it being submitted.
   */
  failedFeatureFlags: z.record(z.string(), z.any()).optional(),
  /**
   * Issue keys that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a Feature Flag has been associated with issue keys other than those in this array it will still be stored
   * against those valid keys. If a Feature Flag was only associated with issue keys deemed to be invalid it won't be
   * persisted.
   */
  unknownIssueKeys: z.array(z.string()).optional(),
  /**
   * Associations that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be
   * for projects that no longer exist.
   *
   * If a feature flag has been associated with any other association other than those in this array it will still be
   * stored against those valid associations. If a feature flag was only associated with the associations in this array,
   * it is deemed to be invalid and it won't be persisted.
   */
  unknownAssociations: z.array(IssueIdOrKeysAssociationSchema).optional(),
});

export type SubmitFeatureFlags = z.infer<typeof SubmitFeatureFlagsSchema>;
