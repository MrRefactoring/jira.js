import type { RoleActor } from './roleActor';
import type { Scope } from './scope';

/** Details about the roles in a project. */
export interface ProjectRole {
  /** The list of users who act in this role. */
  actors?: RoleActor[];
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether the calling user is part of this role. */
  currentUserRole?: boolean;
  /** Whether this role is the default role for the project */
  default?: boolean;
  /** The description of the project role. */
  description?: string;
  /** The ID of the project role. */
  id?: number;
  /** The name of the project role. */
  name?: string;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  scope?: Scope;
  /** The URL the project role details. */
  self?: string;
  /** The translated name of the project role. */
  translatedName?: string;
}
