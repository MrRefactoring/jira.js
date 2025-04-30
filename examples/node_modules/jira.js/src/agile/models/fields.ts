import type { Attachment } from '../../version3/models';
import type { Epic } from './epic';
import type { FixVersion } from './fixVersion';
import type { Issue } from './issue';
import type { IssueType } from './issueType';
import type { Progress } from './progress';
import type { Project } from './project';
import type { Sprint } from './sprint';
import type { Status } from './status';
import type { User } from './user';
import type { Version } from './version';
import type {
  Comment,
  IssueLink,
  Priority,
  ProjectComponent,
  Resolution,
  RichText,
  TimeTrackingDetails,
  Votes,
  Watchers,
  Worklog,
} from '../../version2/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Fields extends Record<string, any> {
  aggregateprogress: Progress;
  aggregatetimeestimate: number | null;
  aggregatetimeoriginalestimate: number | null;
  aggregatetimespent: number | null;
  assignee: User;
  attachment: Attachment[];
  comment: {
    comments: Comment[];
    self: string;
    maxResults: number;
    total: number;
    startAt: number;
  };
  components: ProjectComponent[];
  created: string;
  creator: User;
  description: string | null;
  duedate: string | null;
  environment: RichText | null;
  epic: Epic | null;
  fixVersions: FixVersion[];
  flagged: boolean;
  issuelinks: IssueLink[];
  issuerestriction: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    issuerestrictions: any;
    shouldDisplay: boolean;
  };
  issuetype: IssueType;
  labels: string[];
  lastViewed: string | null;
  priority: Priority;
  progress: Progress;
  project: Project;
  reporter: User;
  resolution: Resolution | null;
  resolutiondate: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  security: any | null;
  sprint: Sprint;
  status: Status;
  statuscategorychangedate: string;
  subtasks: Issue[];
  summary: string;
  timeestimate: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  timeoriginalestimate: any | null;
  timespent: number | null;
  timetracking: TimeTrackingDetails;
  updated: string;
  versions: Version[];
  votes: Votes;
  watches: Watchers;
  worklog: {
    startAt: number;
    maxResults: number;
    total: number;
    worklogs: Worklog[];
  };
  workratio: number;
}
