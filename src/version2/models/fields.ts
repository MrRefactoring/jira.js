/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Attachment } from './attachment';
import type { Comment } from './comment';
import type { FixVersion } from './fixVersion';
import type { Issue } from './issue';
import type { IssueLink } from './issueLink';
import type { IssueTypeDetails } from './issueTypeDetails';
import type { Priority } from './priority';
import type { ProjectComponent } from './projectComponent';
import type { Resolution } from './resolution';
import type { RichText } from './richText';
import type { StatusDetails } from './statusDetails';
import type { TimeTrackingDetails } from './timeTrackingDetails';
import type { User } from './user';
import type { UserDetails } from './userDetails';
import type { Votes } from './votes';
import type { Watchers } from './watchers';
import type { Worklog } from './worklog';

/** Key fields from the linked issue. */
export interface Fields extends Record<string, any> {
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
}
