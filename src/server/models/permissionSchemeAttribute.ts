import { z } from 'zod';
import { apiObject } from '#/core';

export const PermissionSchemeAttributeSchema = apiObject({
  key: z.string().optional(),
  value: z.string().optional(),
});

export type PermissionSchemeAttribute = z.infer<typeof PermissionSchemeAttributeSchema>;
