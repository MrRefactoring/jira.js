import type { RequestParticipantUpdate } from '../models/index.js';

export interface AddRequestParticipants extends RequestParticipantUpdate {
  /** The ID or key of the customer request to have participants added. */
  issueIdOrKey: string;
}
