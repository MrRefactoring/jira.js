import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorSchema = apiObject({
  id: z.string().optional(),
  status: z.string().optional(),
  code: z.string().optional(),
  title: z.string().optional(),
  detail: z.string().optional(),
});

export type Error = z.infer<typeof ErrorSchema>;
