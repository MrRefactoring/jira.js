import { z } from 'zod';
import { apiObject } from '#/core';

export const TerminologyRequestSchema = apiObject({
  newName: z.string().optional(),
  newNamePlural: z.string().optional(),
  originalName: z.string().optional(),
});

export type TerminologyRequest = z.infer<typeof TerminologyRequestSchema>;
