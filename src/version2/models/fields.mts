import type { Attachment } from './attachment.mjs';
import type { Comment } from './comment.mjs';
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
import { User } from './user.mjs';
import { UserDetails } from './userDetails.mjs';
import type { Votes } from './votes.mjs';
import type { Watchers } from './watchers.mjs';
import type { Worklog } from './worklog.mjs';

/** Key fields from the linked issue. */
export interface Fields {
  /** The estimate of how much longer working on the issue will take, in seconds. */
  aggregatetimespent: number | null;
  /** The assignee of the linked issue. */
  assignee: UserDetails;
  /** The list of issue attachments. */
  attachment: Attachment[];
  /** The list of issue comment. */
  comment: {
    /** The list of issue comment. */
    comments: Comment[];
    self: string;
    maxResults: number;
    total: number;
    startAt: number;
  };
  /** The list of project components the issue belongs to. */
  components: ProjectComponent[];
  /** The creation time of the issue. */
  created: string;
  /** The user who created the issue */
  creator: User;
  /** The issue description. */
  description?: string;
  /** The time the issue is due. */
  duedate: string | null;
  /** The value of the environment field. */
  environment: RichText | null;
  /** The list of versions where the issue was fixed. */
  fixVersions: FixVersion[];
  /** The list of issue links. */
  issuelinks: IssueLink[];
  issuerestriction?: {
    issuerestrictions: any;
    shouldDisplay: boolean;
  };
  /** The type of the linked issue. */
  issuetype: IssueTypeDetails;
  /** The list of labels associated with the issue. */
  labels: string[];
  lastViewed: string | null;
  /** The issue parent. */
  parent?: Issue;
  /** The priority of the linked issue. */
  priority: Priority;
  /** The reporter of the issue. */
  reporter: User;
  /** The resolution of the issue. */
  resolution: Resolution | null;
  /** The time the issue was resolved at. */
  resolutiondate: string | null;
  /** The status of the linked issue. */
  status: StatusDetails;
  statuscategorychangedate?: string;
  /** The list of subtasks. */
  subtasks: Issue[];
  /** The summary description of the linked issue. */
  summary: string;
  timeoriginalestimate?: any;
  /** The time that was spent working on the issue, in seconds. */
  timespent: number | null;
  /** The time tracking of the linked issue. */
  timetracking: TimeTrackingDetails;
  /** The time when the issue was last updated at. */
  updated: string;
  /** The number of voters of the issue. Returns an error if voting is disabled. */
  votes: Votes & { voters: never };
  /** The number of watchers of the issue. Returns an error if watching is disabled. */
  watches: Watchers;
  worklog: {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: Worklog[];
  };
  workratio: number;

  [key: string]: any;
}
