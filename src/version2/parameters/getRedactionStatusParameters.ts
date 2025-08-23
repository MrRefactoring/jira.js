import { z } from 'zod';

export const GetRedactionStatusParametersSchema = z.object({
  /** Redaction job id */
  jobId: z.string(),
});

export type GetRedactionStatusParameters = z.infer<typeof GetRedactionStatusParametersSchema>;
