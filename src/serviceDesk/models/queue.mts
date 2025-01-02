import { SelfLink } from './selfLink.mjs';

export interface Queue {
  /** ID for the queue. */
  id?: string;
  /** Short name for the queue. */
  name?: string;
  /** Jql query that filters reqeusts for the queue. */
  jql?: string;
  /** Fields returned for each request in the queue. */
  fields?: string[];
  /** The count of customer requests in the queue. */
  issueCount?: number;
  Links?: SelfLink;
}
