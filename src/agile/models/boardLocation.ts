/** @deprecated Use {@link BoardLocation} instead. */
export type BoardLocationBean = BoardLocation;

/** The container that the board is located in. */
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
