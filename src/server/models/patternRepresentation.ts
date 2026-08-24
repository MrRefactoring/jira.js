import { z } from 'zod';
import { apiObject } from '#/core';

export const PatternRepresentationSchema = apiObject({
  delay: z.number().optional(),
  enabled: z.boolean().optional(),
  id: z.number().optional(),
  pattern: z.string().optional(),
});

export type PatternRepresentation = z.infer<typeof PatternRepresentationSchema>;
