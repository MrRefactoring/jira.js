import { z } from 'zod';
import { apiObject } from '#/core';

export const EntrySchema = apiObject({
  errors: z.array(z.string()).optional(),
  issueId: z.number().optional(),
  issueKey: z.string().optional(),
  status: z.number().optional(),
});

export type Entry = z.infer<typeof EntrySchema>;
