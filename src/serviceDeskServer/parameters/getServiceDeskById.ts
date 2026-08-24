import { z } from 'zod';

export const GetServiceDeskByIdSchema = z.object({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
});

export type GetServiceDeskById = z.input<typeof GetServiceDeskByIdSchema>;
