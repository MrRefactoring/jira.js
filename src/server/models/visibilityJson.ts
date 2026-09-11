import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const VisibilityJsonSchema = apiObject({
  type: openEnum(['group', 'role']).optional(),
  value: z.string().optional(),
});

export type VisibilityJson = z.infer<typeof VisibilityJsonSchema>;
