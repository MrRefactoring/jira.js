import type { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const SourceSchema = apiObject({
  /** Type of the knowledge base source */
  type: openEnum(['confluence']).optional(),
});

export type Source = z.infer<typeof SourceSchema>;
