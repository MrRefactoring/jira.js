import { StatusDetails } from './statusDetails';
import { Priority } from './priority';
import { UserDetails } from './userDetails';
import { TimeTrackingDetails } from './timeTrackingDetails';
import { IssueTypeDetails } from './issueTypeDetails';

/**
 * Key fields from the linked issue. */
export interface Fields {
  /** The summary description of the linked issue. */
  summary?: string;
  /** The status of the linked issue. */
  status?: StatusDetails[];
  /** The priority of the linked issue. */
  priority?: Priority[];
  /** The assignee of the linked issue. */
  assignee?: UserDetails[];
  /** The time tracking of the linked issue. */
  timetracking?: TimeTrackingDetails[];
  /** The type of the linked issue. */
  issuetype?: IssueTypeDetails;
  /** The type of the linked issue. */
  issueType?: IssueTypeDetails[];
}
