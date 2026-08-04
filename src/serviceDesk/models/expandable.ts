import { z } from 'zod';
import { apiObject } from '#/core';

export const ExpandableSchema = apiObject({
  _expands: z.array(z.string()).optional(),
});

export type Expandable = z.infer<typeof ExpandableSchema>;
