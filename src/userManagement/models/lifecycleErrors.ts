import { z } from 'zod';
import { apiObject } from '#/core';

export const LifecycleErrorsSchema = z.array(
  apiObject({
    code: z.string(),
    message: z.string().optional(),
    link: z.string().optional(),
  }),
);

export type LifecycleErrors = z.infer<typeof LifecycleErrorsSchema>;
