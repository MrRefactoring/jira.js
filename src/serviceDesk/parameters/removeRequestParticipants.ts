import { z } from 'zod';
import { RequestParticipantUpdateSchema } from '../models';

export const RemoveRequestParticipantsSchema = z
  .object({
    /** The ID or key of the customer request to have participants removed. */
    issueIdOrKey: z.string(),
  })
  .extend(RequestParticipantUpdateSchema.shape);

export type RemoveRequestParticipants = z.input<typeof RemoveRequestParticipantsSchema>;
