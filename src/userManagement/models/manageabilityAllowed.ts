import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** You are allowed to take or write the action/property* */

export const ManageabilityAllowedSchema = apiObject({
  allowed: openEnum(['true']),
});

export type ManageabilityAllowed = z.infer<typeof ManageabilityAllowedSchema>;
