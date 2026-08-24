import { z } from 'zod';
import { RequestParticipantUpdateSchema } from '../models';

export const AddRequestParticipantsSchema = z.object(RequestParticipantUpdateSchema.shape).extend({
  /** The id or key of the customer request. */
  issueIdOrKey: z.string(),
  /** The starting index of the returned objects. Base index: 0. */
  start: z.number().optional(),
  /** The maximum number of items to return per page. Default: 50. */
  limit: z.number().optional(),
});

export type AddRequestParticipants = z.input<typeof AddRequestParticipantsSchema>;
