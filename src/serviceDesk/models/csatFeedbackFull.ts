import { AdditionalComment } from './additionalComment';

export interface CsatFeedbackFull {
  /** Indicates the type of feedback, supported values: `csat`. */
  type?: string;
  /** A numeric representation of the rating, this must be an integer value between 1 and 5. */
  rating?: number;
  comment?: AdditionalComment;
}
