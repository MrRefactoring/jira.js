/**
 * The bodies Jira posts to a webhook.
 *
 * How much of this is documented, plainly: Atlassian publishes one complete payload, the one for issue events, and
 * says of the rest only that a callback carries "information about the entity associated with the event". So
 * {@link IssueWebhookPayload} below is written from that example and from a capture of a real delivery, and every
 * other group is written from the event's own name. Each of those says so, and each names its entity optionally —
 * there was nothing to verify it against, and an optional field costs you a guard rather than a crash.
 *
 * Nothing here is parsed or validated. A webhook body is whatever a site's configuration makes it: custom fields
 * appear in `issue.fields` under generated keys, an app may add its own, and a schema strict enough to be worth
 * having would reject bodies that are perfectly valid somewhere else.
 */
import type { Attachment } from '../cloud/models/attachment';
import type { Changelog } from '../cloud/models/changelog';
import type { Comment } from '../cloud/models/comment';
import type { Filter } from '../cloud/models/filter';
import type { Issue } from '../cloud/models/issue';
import type { IssueLink } from '../cloud/models/issueLink';
import type { IssueTypeDetails } from '../cloud/models/issueTypeDetails';
import type { Project } from '../cloud/models/project';
import type { UserDetails } from '../cloud/models/userDetails';
import type { Version } from '../cloud/models/version';
import type { Worklog } from '../cloud/models/worklog';
import type { Board } from '../agile/models/board';
import type { Sprint } from '../agile/models/sprint';
import type {
  AppAccessWebhookEvent,
  AttachmentWebhookEvent,
  BoardWebhookEvent,
  CommentWebhookEvent,
  FilterWebhookEvent,
  IssueLinkWebhookEvent,
  IssuePropertyWebhookEvent,
  IssueTypeWebhookEvent,
  IssueWebhookEvent,
  JiraExpressionWebhookEvent,
  OptionWebhookEvent,
  ProjectWebhookEvent,
  SprintWebhookEvent,
  UserWebhookEvent,
  VersionWebhookEvent,
  WebhookEvent,
  WorklogWebhookEvent,
} from './events';

/** What every delivery carries, whatever the event. */
export interface WebhookPayloadBase {
  /** When Jira raised the event, in milliseconds since the epoch. */
  timestamp: number;

  /** The event, and the field to switch on. */
  webhookEvent: WebhookEvent;

  /**
   * The registrations this delivery answered. Present only on a webhook registered through the REST API, where one
   * event can match several of them at once.
   */
  matchedWebhookIds?: number[];
}

/**
 * An issue was created, edited or deleted.
 *
 * The one payload Atlassian documents, and the shape a real delivery was observed to have.
 */
export interface IssueWebhookPayload extends WebhookPayloadBase {
  webhookEvent: IssueWebhookEvent;

  /**
   * Jira's own name for what happened, finer than `webhookEvent`: an edit, a comment and a transition all arrive as
   * `jira:issue_updated` and are told apart only here. Typed as the string it is rather than as a union, because an
   * administrator can add issue events to a site and the set is therefore not closed.
   */
  issue_event_type_name: string;

  /** The issue as it stands after the change. On a deletion, as it stood before. */
  issue: Issue;

  /** Who caused it. Optional because nothing guarantees an actor — a scheduled change has none to name. */
  user?: UserDetails;

  /** What changed. Present on an update, absent on a creation that changed nothing. */
  changelog?: Changelog;

  /** The comment, when the update was someone commenting. */
  comment?: Comment;
}

/**
 * An entity property was written to or removed from an issue.
 *
 * Undocumented. Only the two fields every delivery carries are typed.
 */
export interface IssuePropertyWebhookPayload extends WebhookPayloadBase {
  webhookEvent: IssuePropertyWebhookEvent;
}

/** Work was logged, edited or removed. Undocumented; `worklog` is named after the entity, not from a specification. */
export interface WorklogWebhookPayload extends WebhookPayloadBase {
  webhookEvent: WorklogWebhookEvent;
  worklog?: Worklog;
}

/**
 * A comment was added, edited or removed.
 *
 * Undocumented as a payload of its own — `comment` and `issue` are named after the entities the event concerns.
 * Note that a comment on an issue also raises `jira:issue_updated`, which *is* documented and carries the comment.
 */
export interface CommentWebhookPayload extends WebhookPayloadBase {
  webhookEvent: CommentWebhookEvent;
  comment?: Comment;
  issue?: Issue;
}

/** A file was attached or removed. Undocumented; `attachment` is named after the entity. */
export interface AttachmentWebhookPayload extends WebhookPayloadBase {
  webhookEvent: AttachmentWebhookEvent;
  attachment?: Attachment;
}

/** Two issues were linked or unlinked. Undocumented; `issueLink` is named after the entity. */
export interface IssueLinkWebhookPayload extends WebhookPayloadBase {
  webhookEvent: IssueLinkWebhookEvent;
  issueLink?: IssueLink;
}

/** An issue type changed. Undocumented; `issueType` is named after the entity. */
export interface IssueTypeWebhookPayload extends WebhookPayloadBase {
  webhookEvent: IssueTypeWebhookEvent;
  issueType?: IssueTypeDetails;
}

/** A project changed. Undocumented; `project` is named after the entity. */
export interface ProjectWebhookPayload extends WebhookPayloadBase {
  webhookEvent: ProjectWebhookEvent;
  project?: Project;
}

/** A version changed. Undocumented; `version` is named after the entity. */
export interface VersionWebhookPayload extends WebhookPayloadBase {
  webhookEvent: VersionWebhookEvent;
  version?: Version;
}

/** A filter changed. Undocumented; `filter` is named after the entity. */
export interface FilterWebhookPayload extends WebhookPayloadBase {
  webhookEvent: FilterWebhookEvent;
  filter?: Filter;
}

/** A user was created, edited or deleted. Undocumented; `user` is named after the entity. */
export interface UserWebhookPayload extends WebhookPayloadBase {
  webhookEvent: UserWebhookEvent;
  user?: UserDetails;
}

/**
 * A site-wide setting was turned on or off.
 *
 * Undocumented, and there is no entity to name — the event itself says which setting moved.
 */
export interface OptionWebhookPayload extends WebhookPayloadBase {
  webhookEvent: OptionWebhookEvent;
}

/** A sprint changed. Undocumented; `sprint` is named after the entity. */
export interface SprintWebhookPayload extends WebhookPayloadBase {
  webhookEvent: SprintWebhookEvent;
  sprint?: Sprint;
}

/** A board changed. Undocumented; `board` is named after the entity. */
export interface BoardWebhookPayload extends WebhookPayloadBase {
  webhookEvent: BoardWebhookEvent;
  board?: Board;
}

/** An app was refused access to data it asked for. Delivered to the app; undocumented. */
export interface AppAccessWebhookPayload extends WebhookPayloadBase {
  webhookEvent: AppAccessWebhookEvent;
}

/** A Jira expression an app registered could not be evaluated. Undocumented. */
export interface JiraExpressionWebhookPayload extends WebhookPayloadBase {
  webhookEvent: JiraExpressionWebhookEvent;
}

/**
 * Every payload above, discriminated by `webhookEvent`.
 *
 * ```ts
 * import type { WebhookPayload } from 'jira.js/webhooks';
 *
 * function handle(payload: WebhookPayload) {
 *   switch (payload.webhookEvent) {
 *     case 'jira:issue_created':
 *       return payload.issue.key;
 *     case 'sprint_started':
 *       return payload.sprint?.name;
 *   }
 * }
 * ```
 */
export type WebhookPayload =
  | IssueWebhookPayload
  | IssuePropertyWebhookPayload
  | WorklogWebhookPayload
  | CommentWebhookPayload
  | AttachmentWebhookPayload
  | IssueLinkWebhookPayload
  | IssueTypeWebhookPayload
  | ProjectWebhookPayload
  | VersionWebhookPayload
  | FilterWebhookPayload
  | UserWebhookPayload
  | OptionWebhookPayload
  | SprintWebhookPayload
  | BoardWebhookPayload
  | AppAccessWebhookPayload
  | JiraExpressionWebhookPayload;
