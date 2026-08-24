import { z } from 'zod';

export const GetStatusTypeSchema = z.object({
  /** Status type id */
  id: z.string(),
});

export type GetStatusType = z.input<typeof GetStatusTypeSchema>;
