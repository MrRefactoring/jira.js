import type { Attachment } from './attachment.mjs';
import type { Comment } from './comment.mjs';
import type { Document } from './document.mjs';
import type { FixVersion } from './fixVersion.mjs';
import type { Issue } from './issue.mjs';
import type { IssueLink } from './issueLink.mjs';
import type { IssueTypeDetails } from './issueTypeDetails.mjs';
import type { Priority } from './priority.mjs';
import type { ProjectComponent } from './projectComponent.mjs';
import type { Resolution } from './resolution.mjs';
import type { RichText } from './richText.mjs';
import type { StatusDetails } from './statusDetails.mjs';
import type { TimeTrackingDetails } from './timeTrackingDetails.mjs';
import type { User } from './user.mjs';
import type { UserDetails } from './userDetails.mjs';
import type { Votes } from './votes.mjs';
import type { Watchers } from './watchers.mjs';
import type { Worklog } from './worklog.mjs';

/** Key fields from the linked issue. */
export interface Fields {
  /** The estimate of how much longer working on the issue will take, in seconds. */
  aggregatetimespent: number | null;
  /** The assignee of the linked issue. */
  assignee: UserDetails;
  /** The time the issue is due. */
  duedate: string | null;
  /** The list of versions where the issue was fixed. */
  fixVersions: FixVersion[];
  lastViewed: string | null;
  /** The issue parent. */
  parent?: Issue;
  /** The priority of the linked issue. */
  priority: Priority;
  /** The resolution of the issue. */
  resolution: Resolution | null;
  /** The time the issue was resolved at. */
  resolutiondate: string | null;
  /** The status of the linked issue. */
  status: StatusDetails;
  /** The summary description of the linked issue. */
  summary: string;
  /** The time that was spent working on the issue, in seconds. */
  timespent: number | null;
  /** The time tracking of the linked issue. */
  timetracking: TimeTrackingDetails;
  /** The type of the linked issue. */
  issuetype?: IssueTypeDetails;
  /** The type of the linked issue. */
  issueType?: IssueTypeDetails;
  environment: RichText | null;
  issuelinks: IssueLink[];
  workratio: number;
  issuerestriction?: {
    issuerestrictions: any;
    shouldDisplay: boolean;
  };
  watches: Watchers;
  created: string;
  labels: string[];
  updated: string;
  components: ProjectComponent[];
  timeoriginalestimate?: any;
  description?: Document;
  attachment: Attachment[];
  creator: User;
  subtasks: Issue[];
  reporter: User;
  comment: {
    comments: Comment[];
    self: string;
    maxResults: number;
    total: number;
    startAt: number;
  };
  votes: Votes & { voters: never };
  worklog: {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: Worklog[];
  };

  [key: string]: any;
}
