import { z } from 'zod';
import { apiObject } from '#/core';

export const PermissionsKeysSchema = apiObject({
  /** A list of permission keys. */
  permissions: z.array(z.string()),
});

export type PermissionsKeys = z.infer<typeof PermissionsKeysSchema>;
