/** The result of a successful submitVulnerabilities request.* */
export interface SubmitVulnerabilities {
  /**
   * The IDs of Vulnerabilities that have been accepted for submission.
   *
   * A Vulnerability may be rejected if it was only associated with unknown project keys.
   *
   * Note that a Vulnerability that isn't updated due to it's updateSequenceNumber being out of order is not considered
   * a failed submission.
   */
  acceptedVulnerabilities?: string[];
  /**
   * Details of Vulnerabilities that have not been accepted for submission, usually due to a problem with the request
   * data.
   *
   * The object (if present) will be keyed by Vulnerability ID and include any errors associated with that Vulnerability
   * that have prevented it being submitted.
   */
  failedVulnerabilities?: unknown;
  /**
   * Associations (e.g. Service IDs) that are not known on this Jira instance (if any).
   *
   * If a Vulnerability has been associated with any other association other than those in this array it will still be
   * stored against those valid associations. If a Vulnerability was only associated with the associations in this
   * array, it is deemed to be invalid and it won't be persisted.
   */
  unknownAssociations?: unknown[];
}
