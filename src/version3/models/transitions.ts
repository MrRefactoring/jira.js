import { IssueTransition } from './issueTransition';

/** List of issue transitions. */
export interface Transitions {
  /** Expand options that include additional transitions details in the response. */
  expand?: string;
  /** List of issue transitions. */
  transitions?: IssueTransition[];
}
