/**
 * The result of a successful submitDeployments request.
 *  */
export interface SubmitDeployments {
  /** The keys of deployments that have been accepted for submission. A deployment key is a composite key that consists of `pipelineId`, `environmentId` and `deploymentSequenceNumber`.

   A deployment may be rejected if it was only associated with unknown issue keys.

   Note that a deployment that isn't updated due to it's updateSequenceNumber being out of order is not considered a failed submission.
   */
  acceptedDeployments?: any[];
  /** Details of deployments that have not been accepted for submission, usually due to a problem with the request data.

   The object will contain the deployment key and any errors associated with that deployment that have prevented it being submitted.
   */
  rejectedDeployments?: any[];
  /** Issue keys that are not known on this Jira instance (if any).

   These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be for projects that no longer exist.

   If a deployment has been associated with issue keys other than those in this array it will still be stored against those valid keys.
   If a deployment was only associated with issue keys deemed to be invalid it won't be persisted.
   */
  unknownIssueKeys?: string[];
}
