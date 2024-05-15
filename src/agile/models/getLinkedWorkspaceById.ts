/** The Security Workspace information stored for the given ID. */
export interface GetLinkedWorkspaceById {
  /** The Security Workspace ID */
  workspaceId: string;
  /** Latest date and time that the Security Workspace was updated in Jira. */
  updatedAt: string;
}
