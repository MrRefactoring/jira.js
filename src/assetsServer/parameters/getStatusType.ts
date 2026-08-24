import { z } from 'zod';

export const GetStatusTypeSchema = z.object({
  /** The ID of the status type to retrieve */
  id: z.string(),
});

export type GetStatusType = z.input<typeof GetStatusTypeSchema>;
