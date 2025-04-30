import type { Scope } from './scope';

/** Details about a project role. */
export interface ProjectRoleDetails {
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  /** Whether this role is the default role for the project. */
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
