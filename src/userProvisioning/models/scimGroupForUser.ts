import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM group for user */

export const ScimGroupForUserSchema = apiObject({
  type: z.string().optional(),
  value: z.string().optional(),
  display: z.string().optional(),
  $ref: z.string().optional(),
});

export type ScimGroupForUser = z.infer<typeof ScimGroupForUserSchema>;
