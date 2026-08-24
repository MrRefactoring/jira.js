import { z } from 'zod';

export const GetUserAnonymizationProgressSchema = z.object({
  /** The id of a user anonymization task you wish to obtain details on. */
  taskId: z.number().optional(),
});

export type GetUserAnonymizationProgress = z.input<typeof GetUserAnonymizationProgressSchema>;
