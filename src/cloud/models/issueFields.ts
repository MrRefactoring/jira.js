import { z } from 'zod';
import { apiObject } from '#/core';
import { DocumentSchema, type Document } from './document';
import { IssueTypeDetailsSchema, type IssueTypeDetails } from './issueTypeDetails';
import { ProjectSchema, type Project } from './project';
import { StatusDetailsSchema, type StatusDetails } from './statusDetails';
import { PrioritySchema, type Priority } from './priority';
import { ResolutionSchema, type Resolution } from './resolution';
import { UserDetailsSchema, type UserDetails } from './userDetails';
import { ProjectComponentSchema, type ProjectComponent } from './projectComponent';
import { VersionSchema, type Version } from './version';
import { IssueSchema, type Issue, type IssueInput } from './issue';
import { IssueLinkSchema, type IssueLink } from './issueLink';
import { AttachmentSchema, type Attachment } from './attachment';
import { PageOfCommentsSchema, type PageOfComments } from './pageOfComments';
import { PageOfWorklogsSchema, type PageOfWorklogs } from './pageOfWorklogs';
import { TimeTrackingDetailsSchema, type TimeTrackingDetails } from './timeTrackingDetails';
import { IssueProgressSchema, type IssueProgress } from './issueProgress';
import { VotesSchema, type Votes } from './votes';
import { WatchersSchema, type Watchers } from './watchers';
import { SecurityLevelSchema, type SecurityLevel } from './securityLevel';

export interface IssueFields {
  /** The one-line title. */
  summary?: string;
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
   * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
   * multi-line custom field is not looked at and has to be given in the same form as them.
   */
  description?: (Document | string) | null;
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
   * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
   * multi-line custom field is not looked at and has to be given in the same form as them.
   */
  environment?: (Document | string) | null;
  issuetype?: IssueTypeDetails;
  project?: Project;
  status?: StatusDetails;
  priority?: Priority | null;
  resolution?: Resolution | null;
  assignee?: UserDetails | null;
  reporter?: UserDetails | null;
  creator?: UserDetails;
  /** When the issue was created. */
  created?: Date;
  /** When the issue last changed. */
  updated?: Date;
  /** When the issue was resolved. */
  resolutiondate?: Date | null;
  /** When the issue last moved between status categories. */
  statuscategorychangedate?: Date;
  /** When the current user last opened the issue. */
  lastViewed?: Date | null;
  /** The due date, as `YYYY-MM-DD`. */
  duedate?: string | null;
  /** The labels on the issue. */
  labels?: string[];
  components?: ProjectComponent[];
  fixVersions?: Version[];
  versions?: Version[];
  parent?: Issue;
  subtasks?: Issue[];
  issuelinks?: IssueLink[];
  attachment?: Attachment[];
  comment?: PageOfComments;
  worklog?: PageOfWorklogs;
  timetracking?: TimeTrackingDetails;
  /** Seconds logged on the issue. */
  timespent?: number | null;
  /** Seconds still estimated on the issue. */
  timeestimate?: number | null;
  /** Seconds the issue was first estimated at. */
  timeoriginalestimate?: number | null;
  /** Seconds logged on the issue and its subtasks. */
  aggregatetimespent?: number | null;
  /** Seconds still estimated on the issue and its subtasks. */
  aggregatetimeestimate?: number | null;
  /** Seconds the issue and its subtasks were first estimated at. */
  aggregatetimeoriginalestimate?: number | null;
  progress?: IssueProgress;
  aggregateprogress?: IssueProgress;
  /** Time spent as a percentage of the original estimate, or -1 where nothing was estimated. */
  workratio?: number;
  votes?: Votes;
  watches?: Watchers;
  security?: SecurityLevel | null;
  [key: string]: z.output<z.ZodAny>;
}

export interface IssueFieldsInput {
  /** The one-line title. */
  summary?: string;
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
   * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
   * multi-line custom field is not looked at and has to be given in the same form as them.
   */
  description?: (z.input<typeof DocumentSchema> | string) | null;
  /**
   * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
   * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
   * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
   * multi-line custom field is not looked at and has to be given in the same form as them.
   */
  environment?: (z.input<typeof DocumentSchema> | string) | null;
  issuetype?: z.input<typeof IssueTypeDetailsSchema>;
  project?: z.input<typeof ProjectSchema>;
  priority?: z.input<typeof PrioritySchema> | null;
  resolution?: z.input<typeof ResolutionSchema> | null;
  assignee?: z.input<typeof UserDetailsSchema> | null;
  reporter?: z.input<typeof UserDetailsSchema> | null;
  /** The due date, as `YYYY-MM-DD`. */
  duedate?: string | null;
  /** The labels on the issue. */
  labels?: string[];
  components?: z.input<typeof ProjectComponentSchema>[];
  fixVersions?: z.input<typeof VersionSchema>[];
  versions?: z.input<typeof VersionSchema>[];
  parent?: IssueInput;
  issuelinks?: z.input<typeof IssueLinkSchema>[];
  timetracking?: z.input<typeof TimeTrackingDetailsSchema>;
  /** Seconds logged on the issue. */
  timespent?: number | null;
  /** Seconds still estimated on the issue. */
  timeestimate?: number | null;
  /** Seconds the issue was first estimated at. */
  timeoriginalestimate?: number | null;
  security?: z.input<typeof SecurityLevelSchema> | null;
  [key: `customfield_${string}`]: unknown;
}

/**
 * The fields of an issue: the system fields by name, and every custom field by its `customfield_` key alongside them.
 * Reading one, the fields the request did not ask for are absent; writing one, the fields left out are left as they
 * were.
 */
export const IssueFieldsSchema = apiObject(
  {
    /** The one-line title. */
    summary: z.string().optional(),
    /**
     * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
     * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
     * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
     * multi-line custom field is not looked at and has to be given in the same form as them.
     */
    description: z.union([DocumentSchema, z.string()]).nullish(),
    /**
     * A document in Atlassian Document Format, or a string of wiki markup — a string is sent to the v2 endpoint that
     * parses it, and Jira stores the document it made of it. One write goes to one endpoint, so `description`,
     * `environment`, the comment bodies and the worklog comments in `update` are all markup or all documents; a
     * multi-line custom field is not looked at and has to be given in the same form as them.
     */
    environment: z.union([DocumentSchema, z.string()]).nullish(),
    issuetype: IssueTypeDetailsSchema.optional(),
    project: ProjectSchema.optional(),
    status: StatusDetailsSchema.optional(),
    priority: PrioritySchema.nullish(),
    resolution: ResolutionSchema.nullish(),
    assignee: UserDetailsSchema.nullish(),
    reporter: UserDetailsSchema.nullish(),
    creator: UserDetailsSchema.optional(),
    /** When the issue was created. */
    created: z.coerce.date().optional(),
    /** When the issue last changed. */
    updated: z.coerce.date().optional(),
    /** When the issue was resolved. */
    resolutiondate: z.coerce.date().nullish(),
    /** When the issue last moved between status categories. */
    statuscategorychangedate: z.coerce.date().optional(),
    /** When the current user last opened the issue. */
    lastViewed: z.coerce.date().nullish(),
    /** The due date, as `YYYY-MM-DD`. */
    duedate: z.string().nullish(),
    /** The labels on the issue. */
    labels: z.array(z.string()).optional(),
    components: z.array(ProjectComponentSchema).optional(),
    fixVersions: z.array(VersionSchema).optional(),
    versions: z.array(VersionSchema).optional(),
    parent: (z.lazy((): z.ZodType<Issue, IssueInput> => IssueSchema) as z.ZodType<Issue, IssueInput>).optional(),
    subtasks: z
      .array(z.lazy((): z.ZodType<Issue, IssueInput> => IssueSchema) as z.ZodType<Issue, IssueInput>)
      .optional(),
    issuelinks: z.array(IssueLinkSchema).optional(),
    attachment: z.array(AttachmentSchema).optional(),
    comment: PageOfCommentsSchema.optional(),
    worklog: PageOfWorklogsSchema.optional(),
    timetracking: TimeTrackingDetailsSchema.optional(),
    /** Seconds logged on the issue. */
    timespent: z.number().nullish(),
    /** Seconds still estimated on the issue. */
    timeestimate: z.number().nullish(),
    /** Seconds the issue was first estimated at. */
    timeoriginalestimate: z.number().nullish(),
    /** Seconds logged on the issue and its subtasks. */
    aggregatetimespent: z.number().nullish(),
    /** Seconds still estimated on the issue and its subtasks. */
    aggregatetimeestimate: z.number().nullish(),
    /** Seconds the issue and its subtasks were first estimated at. */
    aggregatetimeoriginalestimate: z.number().nullish(),
    progress: IssueProgressSchema.optional(),
    aggregateprogress: IssueProgressSchema.optional(),
    /** Time spent as a percentage of the original estimate, or -1 where nothing was estimated. */
    workratio: z.number().optional(),
    votes: VotesSchema.optional(),
    watches: WatchersSchema.optional(),
    security: SecurityLevelSchema.nullish(),
  },
  'customfield_',
) satisfies z.ZodType<IssueFields, IssueFieldsInput>;
