import type { RolePayload } from './rolePayload';

export interface RolesCapabilityPayload {
  /** A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to associate with the role and project. */
  roleToProjectActors?: {};
  /** The list of roles to create. */
  roles?: RolePayload[];
}
