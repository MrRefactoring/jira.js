import { z } from 'zod';

export const ErrorMessageSchema = z.object({
  message: z.string().optional(),
});

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;
