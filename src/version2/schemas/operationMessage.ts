import { z } from 'zod';

export const OperationMessageSchema = z.object({
  /** The human-readable message that describes the result. */
  message: z.string(),
  /** The status code of the response. */
  statusCode: z.number().int(),
});

export type OperationMessage = z.infer<typeof OperationMessageSchema>;
