import { z } from 'zod';
import { apiObject } from '#/core';

/** You are allowed to take or write the action/property */
export const ManageabilityAllowedSchema = apiObject({
  allowed: z.literal(true),
});

export type ManageabilityAllowed = z.infer<typeof ManageabilityAllowedSchema>;
