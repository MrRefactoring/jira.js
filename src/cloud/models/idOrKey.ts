import { z } from 'zod';
import { apiObject } from '#/core';

export const IdOrKeySchema = apiObject({
  /** The ID of the referenced item. */
  id: z.number().optional(),
  /** The key of the referenced item. */
  key: z.string().optional(),
});

export type IdOrKey = z.infer<typeof IdOrKeySchema>;
