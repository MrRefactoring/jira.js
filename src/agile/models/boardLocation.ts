/** @deprecated Use BoardLocation instead. */
export type BoardLocationBean = BoardLocation;

export interface BoardLocation {
  projectId?: number;
  userId?: number;
  userAccountId?: string;
  displayName?: string;
  projectName?: string;
  projectKey?: string;
  projectTypeKey?: string;
  avatarURI?: string;
  name?: string;
}
