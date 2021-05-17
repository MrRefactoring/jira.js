import { StatusDetails } from './statusDetails';
import { Priority } from './priority';
import { UserDetails } from './userDetails';
import { TimeTrackingDetails } from './timeTrackingDetails';
import { IssueTypeDetails } from './issueTypeDetails';
import { Watchers } from './watchers';
import { Component } from './component';
import { Attachment } from './attachment';
import { User } from './user';
import { IssueBean } from './issueBean';
import { Comment } from './comment';
import { Votes } from './votes';
import { Worklog } from './worklog';

/**
 * Key fields from the linked issue.
 */
export interface Fields {
  [key: string]: any;

  /** The summary description of the linked issue. */
  summary: string;
  /** The status of the linked issue. */
  status: StatusDetails;
  /** The priority of the linked issue. */
  priority: Priority;
  /** The assignee of the linked issue. */
  assignee: UserDetails;
  /** The time tracking of the linked issue. */
  timetracking: TimeTrackingDetails;
  /** The type of the linked issue. */
  issuetype?: IssueTypeDetails;
  issueType?: IssueTypeDetails;

  timespent?: any;
  fixVersions?: string[];
  aggregatetimespent?: any;
  resolution?: any;
  resolutiondate?: any;
  workratio?: number;
  issuerestriction?: {
    issuerestrictions: any;
    shouldDisplay: boolean;
  };
  lastViewed?: any;
  watches: Watchers;
  created: string;
  labels: string[];
  updated: string;
  components: Component[];
  timeoriginalestimate?: any;
  description?: string;
  attachment: Attachment[];
  creator: User;
  subtasks: IssueBean[];
  reporter: User;
  comment: {
    comments: Comment[];
    self: string;
    maxResults: number;
    total: number;
    startAt: number;
  };
  votes: Votes;
  worklog: {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: Worklog[];
  };
}
