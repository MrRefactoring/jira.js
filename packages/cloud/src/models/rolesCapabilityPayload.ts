import { z } from 'zod';
import { RolePayloadSchema } from '#/models/rolePayload';

export const RolesCapabilityPayloadSchema = z.object({
  /** A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to associate with the role and project. */
  roleToProjectActors: z.record(z.string(), z.any()).optional(),
  /** The list of roles to create. */
  roles: z.array(RolePayloadSchema).optional(),
});

export type RolesCapabilityPayload = z.infer<typeof RolesCapabilityPayloadSchema>;
