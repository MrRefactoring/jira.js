import { z } from 'zod';
import { RequestParticipantUpdateSchema } from '../models';

export const AddRequestParticipantsSchema = z
  .object({
    /** The ID or key of the customer request to have participants added. */
    issueIdOrKey: z.string(),
  })
  .extend(RequestParticipantUpdateSchema.shape);

export type AddRequestParticipants = z.input<typeof AddRequestParticipantsSchema>;
