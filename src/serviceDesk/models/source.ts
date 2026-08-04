import { z } from 'zod';
import { apiObject } from '#/core';

export const SourceSchema = apiObject({
  /** Type of the knowledge base source */
  type: z.enum(['confluence']).optional(),
});

export type Source = z.infer<typeof SourceSchema>;
