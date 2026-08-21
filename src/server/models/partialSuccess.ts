import { z } from 'zod';
import { apiObject } from '#/core';
import { EntrySchema } from './entry';

export const PartialSuccessSchema = apiObject({
  entries: z.array(EntrySchema).optional(),
});

export type PartialSuccess = z.infer<typeof PartialSuccessSchema>;
