import { z } from 'zod';
import { apiObject } from '#/core';

export const HumanReadableArchiveSchema = apiObject({
  entries: z.record(z.string(), z.any()).optional(),
  id: z.number().optional(),
  mediaType: z.string().optional(),
  name: z.string().optional(),
  totalEntryCount: z.number().optional(),
});

export type HumanReadableArchive = z.infer<typeof HumanReadableArchiveSchema>;
