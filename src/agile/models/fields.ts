import type { Attachment } from '../../version3/models/index.js';
import type { Epic } from './epic.js';
import type { FixVersion } from './fixVersion.js';
import type { Issue } from './issue.js';
import type { IssueType } from './issueType.js';
import type { Progress } from './progress.js';
import type { Project } from './project.js';
import type { Sprint } from './sprint.js';
import type { Status } from './status.js';
import type { User } from './user.js';
import type { Version } from './version.js';
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
} from '../../version2/models/index.js';

export interface Fields {
  [key: string]: any;

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
  security: any | null;
  sprint: Sprint;
  status: Status;
  statuscategorychangedate: string;
  subtasks: Issue[];
  summary: string;
  timeestimate: number | null;
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
