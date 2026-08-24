import { z } from 'zod';
import { apiObject } from '#/core';

export const PermissionsJsonSchema = apiObject({
  /** A map of permission keys to permission objects. */
  permissions: z.record(z.string(), z.any()).optional(),
});

export type PermissionsJson = z.infer<typeof PermissionsJsonSchema>;
