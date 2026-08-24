import { z } from 'zod';
import { StatusTypeSchema } from '../models';

export const UpdateStatusTypeSchema = z.object({
  /** The ID of the status type to update */
  id: z.string(),
  body: StatusTypeSchema.optional(),
});

export type UpdateStatusType = z.input<typeof UpdateStatusTypeSchema>;
