import { z } from 'zod';

export const GetRedactionStatusSchema = z.object({
  /** Redaction job id */
  jobId: z.string(),
});

export type GetRedactionStatus = z.input<typeof GetRedactionStatusSchema>;
