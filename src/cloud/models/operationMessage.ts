import { z } from 'zod';
import { apiObject } from '#/core';

export const OperationMessageSchema = apiObject({
  /** The human-readable message that describes the result. */
  message: z.string(),
  /** The status code of the response. */
  statusCode: z.number(),
});

export type OperationMessage = z.infer<typeof OperationMessageSchema>;
