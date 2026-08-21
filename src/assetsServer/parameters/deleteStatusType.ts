import { z } from 'zod';

export const DeleteStatusTypeSchema = z.object({
  /** The ID of the status type to delete */
  id: z.string(),
});

export type DeleteStatusType = z.input<typeof DeleteStatusTypeSchema>;
