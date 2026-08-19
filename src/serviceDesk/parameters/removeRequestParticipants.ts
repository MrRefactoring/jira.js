import { z } from 'zod';
import { RequestParticipantUpdateSchema } from '../models';

export const RemoveRequestParticipantsSchema = z.object(RequestParticipantUpdateSchema.shape).extend({
  /** The ID or key of the customer request to have participants removed. */
  issueIdOrKey: z.string(),
});

export type RemoveRequestParticipants = z.input<typeof RemoveRequestParticipantsSchema>;
