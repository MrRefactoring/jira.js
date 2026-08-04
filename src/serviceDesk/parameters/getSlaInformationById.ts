import { z } from 'zod';

export const GetSlaInformationByIdSchema = z.object({
  /** The ID or key of the customer request whose SLAs will be retrieved. */
  issueIdOrKey: z.string(),
  /** The ID or key of the SLAs metric to be retrieved. */
  slaMetricId: z.number(),
});

export type GetSlaInformationById = z.input<typeof GetSlaInformationByIdSchema>;
