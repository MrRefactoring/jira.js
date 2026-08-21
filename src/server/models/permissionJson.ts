import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** A map of permission keys to permission objects. */

export const PermissionJsonSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
  type: openEnum(['GLOBAL', 'PROJECT']).optional(),
});

export type PermissionJson = z.infer<typeof PermissionJsonSchema>;
