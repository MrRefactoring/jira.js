import { z } from 'zod';
import { apiObject } from '#/core';

export const OriginalOrderSchema = apiObject({
  entries: z.array(z.number()).optional(),
});

export type OriginalOrder = z.infer<typeof OriginalOrderSchema>;
