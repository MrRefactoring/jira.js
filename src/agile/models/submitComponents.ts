/** The result of a successful submitDevopsComponents request.* */
export interface SubmitComponents {
  /**
   * The IDs of Components that have been accepted for submission.
   *
   * A Component may be rejected if it was only associated with unknown project keys.
   *
   * Note that a Component that isn't updated due to it's updateSequenceNumber being out of order is not considered a
   * failed submission.
   */
  acceptedComponents?: string[];
  /**
   * Details of Components that have not been accepted for submission, usually due to a problem with the request data.
   *
   * The object (if present) will be keyed by Component ID and include any errors associated with that Component that
   * have prevented it being submitted.
   */
  failedComponents?: unknown;
  /**
   * Project keys that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF` is sometimes incorrectly identified as a Jira project key), or they may be
   * for projects that no longer exist.
   *
   * If a Component has been associated with project keys other than those in this array it will still be stored against
   * those valid keys. If a Component was only associated with project keys deemed to be invalid it won't be persisted.
   */
  unknownProjectKeys?: string[];
}
