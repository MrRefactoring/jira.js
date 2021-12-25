import { SelfLink } from './selfLink';

export interface Queue {
  /** ID for the queue. */
  id?: string;
  /** Short name for the queue. */
  name?: string;
  /** JQL query that filters reqeusts for the queue. */
  jql?: string;
  /** Fields returned for each request in the queue. */
  fields?: string[];
  /** The count of customer requests in the queue. */
  issueCount?: number;
  Links?: SelfLink;
}
