import { z } from 'zod';

export const GetIssueLimitReportParametersSchema = z.object({
  /**
   * Return issue keys instead of issue ids in the response.
   *
   * Usage: Add `?isReturningKeys=true` to the end of the path to request issue keys.
   */
  isReturningKeys: z.boolean().optional(),
});

export type GetIssueLimitReportParameters = z.infer<typeof GetIssueLimitReportParametersSchema>;
