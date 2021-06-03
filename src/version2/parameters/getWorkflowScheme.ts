export interface GetWorkflowScheme {
  /**
   * The ID of the workflow scheme. Find this ID by editing the desired workflow scheme in Jira. The ID is shown in the
   * URL as `schemeId`. For example, *schemeId=10301*.
   */
  id: number;
  /**
   * Returns the workflow scheme's draft rather than scheme itself, if set to true. If the workflow scheme does not have
   * a draft, then the workflow scheme is returned.
   */
  returnDraftIfExists?: boolean;
}
