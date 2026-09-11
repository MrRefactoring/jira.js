import { z } from 'zod';
import { apiObject } from '#/core';
import { WriteListenerSchema } from './writeListener';

export const ServletOutputStreamSchema = apiObject({
  ready: z.boolean().optional(),
  writeListener: WriteListenerSchema.optional(),
});

export type ServletOutputStream = z.infer<typeof ServletOutputStreamSchema>;
