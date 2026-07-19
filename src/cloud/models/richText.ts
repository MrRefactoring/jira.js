import { z } from 'zod';
import { apiObject } from '#/core';

export const RichTextSchema = apiObject({
  empty: z.boolean().optional(),
  emptyAdf: z.boolean().optional(),
  finalised: z.boolean().optional(),
  valueSet: z.boolean().optional(),
});

export type RichText = z.infer<typeof RichTextSchema>;
