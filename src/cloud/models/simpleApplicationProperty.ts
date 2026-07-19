import { z } from 'zod';
import { apiObject } from '#/core';

export const SimpleApplicationPropertySchema = apiObject({
  /** The ID of the application property. */
  id: z.string().optional(),
  /** The new value. */
  value: z.string().optional(),
});

export type SimpleApplicationProperty = z.infer<typeof SimpleApplicationPropertySchema>;
