import { Scope } from './scope';

/**
 * Details about a project role. */
export interface ProjectRoleDetails {
  /** The URL the project role details. */
  self?: string;
  /** The name of the project role. */
  name?: string;
  /** The ID of the project role. */
  id?: number;
  /** The description of the project role. */
  description?: string;
  /** Whether this role is the admin role for the project. */
  admin?: boolean;
  scope?: Scope;
  /** Whether the roles are configurable for this project. */
  roleConfigurable?: boolean;
  /** The translated name of the project role. */
  translatedName?: string;
  /** Whether this role is the default role for the project. */
  default?: boolean;
}
