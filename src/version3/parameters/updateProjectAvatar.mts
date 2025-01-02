import { Avatar } from '../models/index.mjs';

export interface UpdateProjectAvatar extends Avatar {
  /** The ID or (case-sensitive) key of the project. */
  projectIdOrKey: string;
}
