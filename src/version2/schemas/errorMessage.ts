import { z } from 'zod';

export const ErrorMessageSchema = z.object({
  /** The error message. */
  message: z.string(),
});

export type ErrorMessage = z.infer<typeof ErrorMessageSchema>;
