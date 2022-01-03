import { CsatFeedbackFull } from '../models';

export interface PostFeedback extends CsatFeedbackFull {
  /** The id or the key of the request to post the feedback on */
  requestIdOrKey: string;
}
