import { z } from 'zod';

export const DeleteStatusTypeSchema = z.object({
  /** Status type id */
  id: z.string(),
});

export type DeleteStatusType = z.input<typeof DeleteStatusTypeSchema>;
