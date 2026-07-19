import { z } from 'zod';
import { apiObject } from '#/core';
import { RolePayloadSchema } from './rolePayload';

export const RolesCapabilityPayloadSchema = apiObject({
  /** A map of role PCRI (can be ID or REF) to a list of user or group PCRI IDs to associate with the role and project. */
  roleToProjectActors: z.record(z.string(), z.any()).optional(),
  /** The list of roles to create. */
  roles: z.array(RolePayloadSchema).optional(),
});

export type RolesCapabilityPayload = z.infer<typeof RolesCapabilityPayloadSchema>;
