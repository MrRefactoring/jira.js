import { Attachment } from '@/version3/models/index.mjs'; // todo why?
import { Epic } from './epic.mjs';
import type { FixVersion } from './fixVersion.mjs';
import type { Issue } from './issue.mjs';
import { IssueType } from './issueType.mjs';
import { Progress } from './progress.mjs';
import type { Project } from './project.mjs';
import { Sprint } from './sprint.mjs';
import type { Status } from './status.mjs';
import { User } from './user.mjs';
import type { Version } from './version.mjs';
import {
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
} from '@/version2/models/index.mjs';

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
