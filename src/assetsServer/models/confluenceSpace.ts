import { z } from 'zod';
import { apiObject } from '#/core';

export const ConfluenceSpaceSchema = apiObject({
  key: z.string().optional(),
  name: z.string().optional(),
  error: z.boolean().optional(),
});

export type ConfluenceSpace = z.infer<typeof ConfluenceSpaceSchema>;
