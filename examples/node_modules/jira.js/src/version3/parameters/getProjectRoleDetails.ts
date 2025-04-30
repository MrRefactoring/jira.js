export interface GetProjectRoleDetails {
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: string | number;
  /** Whether the roles should be filtered to include only those the user is assigned to. */
  currentMember?: boolean;
  excludeConnectAddons?: boolean;
}
