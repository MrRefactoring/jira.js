import { RequestParticipantUpdate } from '../models';

export interface RemoveRequestParticipants extends RequestParticipantUpdate {
  /** The ID or key of the customer request to have participants removed. */
  issueIdOrKey: string;
}
