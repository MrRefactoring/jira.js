import { z } from 'zod';
import { apiObject } from '#/core';

export const ResponseValueSchema = apiObject({
  errorStringI18n: z.string().optional(),
});

export type ResponseValue = z.infer<typeof ResponseValueSchema>;
