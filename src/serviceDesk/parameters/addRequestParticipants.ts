import { z } from 'zod';
import { RequestParticipantUpdateSchema } from '../models';

export const AddRequestParticipantsSchema = z.object(RequestParticipantUpdateSchema.shape).extend({
  /** The ID or key of the customer request to have participants added. */
  issueIdOrKey: z.string(),
});

export type AddRequestParticipants = z.input<typeof AddRequestParticipantsSchema>;
