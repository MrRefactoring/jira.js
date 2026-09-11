import { z } from 'zod';
import { apiObject } from '#/core';

export const TerminologyResponseSchema = apiObject({
  isDefault: z.boolean().optional(),
  newName: z.string().optional(),
  newNamePlural: z.string().optional(),
  originalName: z.string().optional(),
  originalNamePlural: z.string().optional(),
});

export type TerminologyResponse = z.infer<typeof TerminologyResponseSchema>;
