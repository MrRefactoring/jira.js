import { z } from 'zod';
import { apiObject } from '#/core';
import { ReadListenerSchema } from './readListener';

export const ServletInputStreamSchema = apiObject({
  finished: z.boolean().optional(),
  readListener: ReadListenerSchema.optional(),
  ready: z.boolean().optional(),
});

export type ServletInputStream = z.infer<typeof ServletInputStreamSchema>;
