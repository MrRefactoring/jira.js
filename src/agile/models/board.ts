import type { AvatarUrls } from './avatarUrls';

/** Details about a board. */
export interface Board {
  /** The users and groups who own the board. */
  admins?: {
    groups?: {
      name?: string;
      self?: string;
    }[];
    users?: {
      /**
       * The account ID of the user, which uniquely identifies the user across all Atlassian products. For example,
       * _5b10ac8d82e05b22cc7d4ef5_.
       */
      accountId?: string;
      /** Whether the user is active. */
      active?: boolean;
      avatarUrls?: AvatarUrls;
      /** The display name of the user. Depending on the user’s privacy setting, this may return an alternative value. */
      displayName?: string;
      /** The URL of the user. */
      self?: string;
    }[];
  };
  /** Whether the board can be edited. */
  canEdit?: boolean;
  /** Whether the board is selected as a favorite. */
  favourite?: boolean;
  /** The ID of the board. */
  id?: number;
  /** Whether the board is private. */
  isPrivate?: boolean;
  /** The container that the board is located in. */
  location?: {
    avatarURI?: string;
    displayName?: string;
    name?: string;
    projectId?: number;
    projectKey?: string;
    projectName?: string;
    projectTypeKey?: string;
    userAccountId?: string;
    userId?: number;
  };
  /** The name of the board. */
  name?: string;
  /** The URL of the board. */
  self?: string;
  /** The type the board. */
  type?: string;
}
