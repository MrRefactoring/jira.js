import { z } from 'zod';
import { apiObject } from '#/core';

export const PolicyFilterSchema = apiObject({
  /** Returns workspaces, which contains policy listed */
  policies: z.array(z.string()).optional(),
});

export type PolicyFilter = z.infer<typeof PolicyFilterSchema>;
