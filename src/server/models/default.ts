import { z } from 'zod';
import { apiObject } from '#/core';

export const DefaultSchema = apiObject({
  updateDraftIfNeeded: z.boolean().optional(),
  workflow: z.string().optional(),
});

export type Default = z.infer<typeof DefaultSchema>;
