import { z } from 'zod';

export const GetSlaInformationByIdSchema = z.object({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The id of the SLA metric. */
  slaMetricId: z.string(),
});

export type GetSlaInformationById = z.input<typeof GetSlaInformationByIdSchema>;
