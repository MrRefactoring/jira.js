/**
 * The result of a successful submitDeployments request.
 *  */
export interface SubmitDeployments {
  /** The keys of deployments that have been accepted for submission. A deployment key is a composite key that consists of `pipelineId`, `environmentId` and `deploymentSequenceNumber`.

   A deployment may be rejected if it was only associated with unknown issue keys.

   Note that a deployment that isn't updated due to it's updateSequenceNumber being out of order is not considered a failed submission.
   */
  acceptedDeployments?: {
    /** The identifier of a pipeline, must be unique for the provider.
     */
    pipelineId: string;
    /** The identifier of an environment, must be unique for the provider so that it can be shared across pipelines.
     */
    environmentId: string;
    /** This is the identifier for the deployment. It must be unique for the specified pipeline and environment. It must be a monotonically increasing number, as this is used to sequence the deployments.
     */
    deploymentSequenceNumber: number;
  }[];
  /** Details of deployments that have not been accepted for submission, usually due to a problem with the request data.

   The object will contain the deployment key and any errors associated with that deployment that have prevented it being submitted.
   */
  rejectedDeployments?: {
    /** Fields that uniquely reference a deployment.
     */
    key: {
      /** The identifier of a pipeline, must be unique for the provider.
       */
      pipelineId: string;
      /** The identifier of an environment, must be unique for the provider so that it can be shared across pipelines.
       */
      environmentId: string;
      /** This is the identifier for the deployment. It must be unique for the specified pipeline and environment. It must be a monotonically increasing number, as this is used to sequence the deployments.
       */
      deploymentSequenceNumber: number;
    };
    /** The error messages for the rejected deployment */
    errors: {
      /** A human-readable message describing the error. */
      message: string;
      /** An optional trace ID that can be used by Jira developers to locate the source of the error. */
      errorTraceId?: string;
    }[];
  }[];
  /** Issue keys that are not known on this Jira instance (if any).

   These may be invalid keys (e.g. `UTF-8` is sometimes incorrectly identified as a Jira issue key), or they may be for projects that no longer exist.

   If a deployment has been associated with issue keys other than those in this array it will still be stored against those valid keys.
   If a deployment was only associated with issue keys deemed to be invalid it won't be persisted.
   */
  unknownIssueKeys?: string[];
}
