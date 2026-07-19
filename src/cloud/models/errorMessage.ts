import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorMessageSchema = apiObject({
  message: z.string().optional(),
});

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;
