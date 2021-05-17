/**
 * The current gating status for the given Deployment.
 *  */
export interface GetDeploymentGatingStatusByKey {
  /** This is the identifier for the Deployment.
   */
  deploymentSequenceNumber?: number;
  /** The ID of the Deployment's pipeline.
   */
  pipelineId?: string;
  /** The ID of the Deployment's environment.
   */
  environmentId?: string;
  /** Time the deployment gating status was updated.
   */
  updatedTimestamp?: string;
  /** The gating status
   */
  gatingStatus?: string;
  details?: {
    /** The type of the gating status details.
     */
    type: string;
    /** An issue key that references an issue in Jira.
     */
    issueKey: string;
    /** A full HTTPS link to the Jira issue for the change request gating this Deployment. This field is provided if the details type is issue.
     */
    issueLink: string;
  }[];
}
