/** The result of a successful submitIncidents request.* */
export interface SubmitEntity {
  /**
   * The IDs of Incidents that have been accepted for submission.
   *
   * A Incident may be rejected if it was only associated with unknown project keys.
   *
   * Note that a Incident that isn't updated due to it's updateSequenceNumber being out of order is not considered a
   * failed submission.
   */
  acceptedIncidents?: string[];
  /**
   * Details of Incidents that have not been accepted for submission, usually due to a problem with the request data.
   *
   * The object (if present) will be keyed by Incident ID and include any errors associated with that Incident that have
   * prevented it being submitted.
   */
  failedIncidents?: unknown;
  /**
   * Project keys that are not known on this Jira instance (if any).
   *
   * These may be invalid keys (e.g. `UTF` is sometimes incorrectly identified as a Jira project key), or they may be
   * for projects that no longer exist.
   *
   * If a Incident has been associated with project keys other than those in this array it will still be stored against
   * those valid keys. If a Incident was only associated with project keys deemed to be invalid it won't be persisted.
   */
  unknownProjectKeys?: string[];
}
