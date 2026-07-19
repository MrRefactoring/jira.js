import { z } from 'zod';
import { apiObject } from '#/core';

export const RenderedValueSchema = apiObject({
  html: z.string().optional(),
});

export type RenderedValue = z.infer<typeof RenderedValueSchema>;
