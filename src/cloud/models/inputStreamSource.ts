import { z } from 'zod';
import { apiObject } from '#/core';

export const InputStreamSourceSchema = apiObject({
  inputStream: z.record(z.string(), z.any()).optional(),
});

export type InputStreamSource = z.infer<typeof InputStreamSourceSchema>;
