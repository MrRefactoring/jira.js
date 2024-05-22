import type { RequestParticipantUpdate } from '../models/index.js';

export interface RemoveRequestParticipants extends RequestParticipantUpdate {
  /** The ID or key of the customer request to have participants removed. */
  issueIdOrKey: string;
}
