import { IssueSchema, type Issue } from '../models/issue';
import { FieldValueSchema, type FieldValue } from '../models/fieldValue';
import { IssueCreateResponseSchema, type IssueCreateResponse } from '../models/issueCreateResponse';
import { IssuesCreateResponseSchema, type IssuesCreateResponse } from '../models/issuesCreateResponse';
import { CreateMetaIssueTypeSchema, type CreateMetaIssueType } from '../models/createMetaIssueType';
import { FieldMetaSchema, type FieldMeta } from '../models/fieldMeta';
import { IssuePickerResultSchema, type IssuePickerResult } from '../models/issuePickerResult';
import {
  RemoteReciprocalIssueLinkCreateResponseSchema,
  type RemoteReciprocalIssueLinkCreateResponse,
} from '../models/remoteReciprocalIssueLinkCreateResponse';
import { AttachmentJsonSchema, type AttachmentJson } from '../models/attachmentJson';
import {
  CommentsWithPaginationJsonSchema,
  type CommentsWithPaginationJson,
} from '../models/commentsWithPaginationJson';
import { CommentJsonSchema, type CommentJson } from '../models/commentJson';
import { EditMetaSchema, type EditMeta } from '../models/editMeta';
import { PinnedCommentJsonSchema, type PinnedCommentJson } from '../models/pinnedCommentJson';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { RemoteIssueLinkSchema, type RemoteIssueLink } from '../models/remoteIssueLink';
import { IssueRefJsonSchema, type IssueRefJson } from '../models/issueRefJson';
import { TransitionsMetaSchema, type TransitionsMeta } from '../models/transitionsMeta';
import { VoteSchema, type Vote } from '../models/vote';
import { WatchersSchema, type Watchers } from '../models/watchers';
import { WorklogWithPaginationSchema, type WorklogWithPagination } from '../models/worklogWithPagination';
import { WorklogSchema, type Worklog } from '../models/worklog';
import type { RankIssues } from '../parameters/rankIssues';
import type { GetAgileIssue } from '../parameters/getAgileIssue';
import type { GetIssueEstimationForBoard } from '../parameters/getIssueEstimationForBoard';
import type { EstimateIssueForBoard } from '../parameters/estimateIssueForBoard';
import type { CreateIssue } from '../parameters/createIssue';
import type { ArchiveIssues } from '../parameters/archiveIssues';
import type { CreateIssues } from '../parameters/createIssues';
import type { GetCreateIssueMetaProjectIssueTypes } from '../parameters/getCreateIssueMetaProjectIssueTypes';
import type { GetCreateIssueMetaFields } from '../parameters/getCreateIssueMetaFields';
import type { GetIssuePickerResource } from '../parameters/getIssuePickerResource';
import type { CreateReciprocalRemoteIssueLink } from '../parameters/createReciprocalRemoteIssueLink';
import type { GetIssue } from '../parameters/getIssue';
import type { EditIssue } from '../parameters/editIssue';
import type { DeleteIssue } from '../parameters/deleteIssue';
import type { ArchiveIssue } from '../parameters/archiveIssue';
import type { Assign } from '../parameters/assign';
import type { AddAttachment } from '../parameters/addAttachment';
import type { GetComments } from '../parameters/getComments';
import type { AddComment } from '../parameters/addComment';
import type { GetComment } from '../parameters/getComment';
import type { UpdateComment } from '../parameters/updateComment';
import type { DeleteComment } from '../parameters/deleteComment';
import type { SetPinComment } from '../parameters/setPinComment';
import type { GetEditIssueMeta } from '../parameters/getEditIssueMeta';
import type { Notify } from '../parameters/notify';
import type { GetPinnedComments } from '../parameters/getPinnedComments';
import type { GetIssuePropertyKeys } from '../parameters/getIssuePropertyKeys';
import type { GetIssueProperty } from '../parameters/getIssueProperty';
import type { SetIssueProperty } from '../parameters/setIssueProperty';
import type { DeleteIssueProperty } from '../parameters/deleteIssueProperty';
import type { GetRemoteIssueLinks } from '../parameters/getRemoteIssueLinks';
import type { CreateOrUpdateRemoteIssueLink } from '../parameters/createOrUpdateRemoteIssueLink';
import type { DeleteRemoteIssueLinkByGlobalId } from '../parameters/deleteRemoteIssueLinkByGlobalId';
import type { GetRemoteIssueLinkById } from '../parameters/getRemoteIssueLinkById';
import type { UpdateRemoteIssueLink } from '../parameters/updateRemoteIssueLink';
import type { DeleteRemoteIssueLinkById } from '../parameters/deleteRemoteIssueLinkById';
import type { RestoreIssue } from '../parameters/restoreIssue';
import type { GetSubTasks } from '../parameters/getSubTasks';
import type { CanMoveSubTask } from '../parameters/canMoveSubTask';
import type { MoveSubTasks } from '../parameters/moveSubTasks';
import type { GetTransitions } from '../parameters/getTransitions';
import type { DoTransition } from '../parameters/doTransition';
import type { GetVotes } from '../parameters/getVotes';
import type { AddVote } from '../parameters/addVote';
import type { RemoveVote } from '../parameters/removeVote';
import type { GetIssueWatchers } from '../parameters/getIssueWatchers';
import type { AddWatcher } from '../parameters/addWatcher';
import type { RemoveWatcher } from '../parameters/removeWatcher';
import type { GetIssueWorklog } from '../parameters/getIssueWorklog';
import type { AddWorklog } from '../parameters/addWorklog';
import type { GetWorklog } from '../parameters/getWorklog';
import type { UpdateWorklog } from '../parameters/updateWorklog';
import type { DeleteWorklog } from '../parameters/deleteWorklog';
import { type Client, type SendRequestOptions, toFormDataFile } from '#/core';
import { z } from 'zod';

/**
 * Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once. This operation may fail
 * for some issues, although this will be rare. In that case the 207 status code is returned for the whole response and
 * detailed information regarding each issue is available in the response body. If rankCustomFieldId is not defined, the
 * default rank field will be used.
 */
export async function rankIssues(client: Client, parameters: RankIssues): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/issue/rank',
    method: 'PUT',
    body: {
      issues: parameters.issues,
      rankAfterIssue: parameters.rankAfterIssue,
      rankBeforeIssue: parameters.rankBeforeIssue,
      rankCustomFieldId: parameters.rankCustomFieldId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a single issue, for a given issue Id or issue key. Issues returned from this resource include Agile fields,
 * like sprint, closedSprints, flagged, and epic.
 */
export async function getAgileIssue(client: Client, parameters: GetAgileIssue): Promise<Issue> {
  const config: SendRequestOptions<Issue> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      fields: parameters.fields,
      updateHistory: parameters.updateHistory,
    },
    schema: IssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the estimation of the issue and a fieldId of the field that is used for it. Original time internally stores
 * and returns the estimation as a number of seconds. The field used for estimation on the given board can be obtained
 * from board configuration resource. More information about the field are returned by edit meta resource or field
 * resource.
 */
export async function getIssueEstimationForBoard(
  client: Client,
  parameters: GetIssueEstimationForBoard,
): Promise<FieldValue> {
  const config: SendRequestOptions<FieldValue> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
    method: 'GET',
    searchParams: {
      boardId: parameters.boardId,
    },
    schema: FieldValueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the estimation of the issue. boardId param is required. This param determines which field will be updated on
 * a issue. Note that this resource changes the estimation field of the issue regardless of appearance the field on the
 * screen. Original time tracking estimation field accepts estimation in formats like "1w", "2d", "3h", "20m" or number
 * which represent number of minutes. However, internally the field stores and returns the estimation as a number of
 * seconds. The field used for estimation on the given board can be obtained from <a
 * href="#agile/1.0/board-getConfiguration">board configuration resource</a>. More information about the field are
 * returned by edit meta resource or field resource.
 */
export async function estimateIssueForBoard(client: Client, parameters: EstimateIssueForBoard): Promise<FieldValue> {
  const config: SendRequestOptions<FieldValue> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
    method: 'PUT',
    searchParams: {
      boardId: parameters.boardId,
    },
    body: {
      value: parameters.value,
    },
    schema: FieldValueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates an issue or a sub-task from a JSON representation. The fields that can be set on create, in either the fields
 * parameter or the update parameter can be determined using the /rest/api/2/issue/createmeta resource. If a field is
 * not configured to appear on the create screen, then it will not be in the createmeta, and a field validation error
 * will occur if it is submitted. Creating a sub-task is similar to creating a regular issue, with two important
 * differences:
 *
 * - The issueType field must correspond to a sub-task issue type (you can use /issue/createmeta to discover sub-task
 *   issue types), and
 * - You must provide a parent field in the issue create request containing the id or key of the parent issue. The
 *   updateHistory param adds the project that this issue is created in, to the current user's project history, if set
 *   to true (by default, the project history is not updated). You can view the project history in the Jira application,
 *   via the Projects dropdown.
 */
export async function createIssue(client: Client, parameters: CreateIssue): Promise<IssueCreateResponse> {
  const config: SendRequestOptions<IssueCreateResponse> = {
    url: '/rest/api/2/issue',
    method: 'POST',
    searchParams: {
      updateHistory: parameters.updateHistory,
    },
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
    schema: IssueCreateResponseSchema,
  };

  return await client.sendRequest(config);
}

/** Archives a list of issues. */
export async function archiveIssues(client: Client, parameters: ArchiveIssues): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/issue/archive',
    method: 'POST',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
    },
    body: parameters.body,
    contentType: 'text/plain',
  };

  return await client.sendRequest(config);
}

/**
 * Creates issues or sub-tasks from a JSON representation. Creates many issues in one bulk operation. Creating a
 * sub-task is similar to creating a regular issue. More details can be found in createIssue section.
 */
export async function createIssues(client: Client, parameters: CreateIssues): Promise<IssuesCreateResponse> {
  const config: SendRequestOptions<IssuesCreateResponse> = {
    url: '/rest/api/2/issue/bulk',
    method: 'POST',
    body: {
      issueUpdates: parameters.issueUpdates,
    },
    schema: IssuesCreateResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the metadata for issue types used for creating issues. Data will not be returned if the user does not have
 * permission to create issues in that project.
 */
export async function getCreateIssueMetaProjectIssueTypes(
  client: Client,
  parameters: GetCreateIssueMetaProjectIssueTypes,
): Promise<CreateMetaIssueType> {
  const config: SendRequestOptions<CreateMetaIssueType> = {
    url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      startAt: parameters.startAt,
    },
    schema: CreateMetaIssueTypeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the metadata for issue types used for creating issues. Data will not be returned if the user does not have
 * permission to create issues in that project.
 */
export async function getCreateIssueMetaFields(
  client: Client,
  parameters: GetCreateIssueMetaFields,
): Promise<FieldMeta> {
  const config: SendRequestOptions<FieldMeta> = {
    url: `/rest/api/2/issue/createmeta/${parameters.projectIdOrKey}/issuetypes/${parameters.issueTypeId}`,
    method: 'GET',
    searchParams: {
      maxResults: parameters.maxResults,
      startAt: parameters.startAt,
    },
    schema: FieldMetaSchema,
  };

  return await client.sendRequest(config);
}

/** Get issue picker resource */
export async function getIssuePickerResource(
  client: Client,
  parameters?: GetIssuePickerResource,
): Promise<IssuePickerResult> {
  const config: SendRequestOptions<IssuePickerResult> = {
    url: '/rest/api/2/issue/picker',
    method: 'GET',
    searchParams: {
      currentProjectId: parameters?.currentProjectId,
      query: parameters?.query,
      currentIssueKey: parameters?.currentIssueKey,
      showSubTasks: parameters?.showSubTasks,
      currentJQL: parameters?.currentJQL,
      showSubTaskParent: parameters?.showSubTaskParent,
    },
    schema: IssuePickerResultSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create reciprocal remote issue link from a JSON representation. Jira will create two issue links, source -> target
 * and target -> source.
 *
 * Available since Jira Data Center 10.7.
 */
export async function createReciprocalRemoteIssueLink(
  client: Client,
  parameters: CreateReciprocalRemoteIssueLink,
): Promise<RemoteReciprocalIssueLinkCreateResponse> {
  const config: SendRequestOptions<RemoteReciprocalIssueLinkCreateResponse> = {
    url: '/rest/api/2/issue/remotelink/reciprocal',
    method: 'POST',
    body: {
      source: parameters.source,
      target: parameters.target,
    },
    schema: RemoteReciprocalIssueLinkCreateResponseSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a full representation of the issue for the given issue key. An issue JSON consists of the issue key, a
 * collection of fields, a link to the workflow transition sub-resource, and (optionally) the HTML rendered values of
 * any fields that support it (e.g. if wiki syntax is enabled for the description or comments). The fields param (which
 * can be specified multiple times) gives a comma-separated list of fields to include in the response. This can be used
 * to retrieve a subset of fields. A particular field can be excluded by prefixing it with a minus. By default, all
 * (*all) fields are returned in this get-issue resource. Note: the default is different when doing a jql search -- the
 * default there is just navigable fields (*navigable).
 *
 * - *all - include all fields
 * - *navigable - include just navigable fields
 * - Summary,comment - include just the summary and comments
 * - -comment - include everything except comments (the default is *all for get-issue)
 * - *all,-comment - include everything except comments
 *
 * The `properties` param is similar to `fields` and specifies a comma-separated list of issue properties to include.
 * Unlike `fields`, properties are not included by default. To include them all send `?properties=*all`. You can also
 * include only specified properties or exclude some properties with a minus (-) sign.
 *
 * - `*all` - include all properties
 * - `*all, -prop1` - include all properties except `prop1`
 * - `prop1, prop1` - include `prop1` and `prop2` properties
 *
 * Jira will attempt to identify the issue by the issueIdOrKey path parameter. This can be an issue id, or an issue key.
 * If the issue cannot be found via an exact match, Jira will also look for the issue in a case-insensitive way, by
 * looking to see if the issue was moved. In either of these cases, the request will proceed as normal (a 302 or other
 * redirect will not be returned). The issue key contained in the response will indicate the current value of issue's
 * key.
 *
 * The expand param is used to include, hidden by default, parts of response. This can be used to include:
 *
 * - RenderedFields - field values in HTML format
 * - Names - display name of each field
 * - Schema - schema for each field which describes a type of the field
 * - Transitions - all possible transitions for the given issue
 * - Operations - all possibles operations which may be applied on issue
 * - Editmeta - information about how each field may be edited. It contains field's schema as well.
 * - Changelog - history of all changes of the given issue
 * - VersionedRepresentations - REST representations of all fields. Some field may contain more recent versions. RESET
 *   representations are numbered. The greatest number always represents the most recent version. It is recommended that
 *   the most recent version is used. version for these fields which provide a more recent REST representation. After
 *   including versionedRepresentations "fields" field become hidden.
 */
export async function getIssue(client: Client, parameters: GetIssue): Promise<Issue> {
  const config: SendRequestOptions<Issue> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      fields: parameters.fields,
      updateHistory: parameters.updateHistory,
      properties: parameters.properties,
    },
    schema: IssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Edits an issue from a JSON representation. The issue can either be updated by setting explicit the field value(s) or
 * by using an operation to change the field value.
 */
export async function editIssue(client: Client, parameters: EditIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
    method: 'PUT',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
    },
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Deletes an issue. If the issue has subtasks you must set the parameter deleteSubtasks=true to delete the issue. You
 * cannot delete an issue without its subtasks also being deleted.
 */
export async function deleteIssue(client: Client, parameters: DeleteIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
    method: 'DELETE',
    searchParams: {
      deleteSubtasks: parameters.deleteSubtasks,
    },
  };

  return await client.sendRequest(config);
}

/** Archives an issue. */
export async function archiveIssue(client: Client, parameters: ArchiveIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/archive`,
    method: 'PUT',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
    },
  };

  return await client.sendRequest(config);
}

/** Assign an issue to a user. */
export async function assign(client: Client, parameters: Assign): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
    method: 'PUT',
    body: {
      active: parameters.active,
      applicationRoles: parameters.applicationRoles,
      avatarUrls: parameters.avatarUrls,
      deleted: parameters.deleted,
      displayName: parameters.displayName,
      emailAddress: parameters.emailAddress,
      expand: parameters.expand,
      groups: parameters.groups,
      key: parameters.key,
      lastLoginTime: parameters.lastLoginTime,
      locale: parameters.locale,
      name: parameters.name,
      self: parameters.self,
      timeZone: parameters.timeZone,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Add one or more attachments to an issue. This resource expects a multipart post. The media-type multipart/form-data
 * is defined in RFC 1867. Most client libraries have classes that make dealing with multipart posts simple. For
 * instance, in Java the Apache HTTP Components library provides a MultiPartEntity that makes it simple to submit a
 * multipart POST. In order to protect against XSRF attacks, because this method accepts multipart/form-data, it has
 * XSRF protection on it. This means you must submit a header of X-Atlassian-Token: no-check with the request, otherwise
 * it will be blocked. The name of the multipart/form-data parameter that contains attachments must be file. A simple
 * example to upload a file called "myfile.txt" to issue TEST-123: curl -D- -u admin:admin -X POST -H
 * "X-Atlassian-Token: no-check" -F "file=@myfile.txt" http://myhost/rest/api/2/issue/TEST-123/attachments
 */
export async function addAttachment(client: Client, parameters: AddAttachment): Promise<AttachmentJson[]> {
  const formData = new FormData();
  const items = Array.isArray(parameters.attachments) ? parameters.attachments : [parameters.attachments];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<AttachmentJson[]> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/attachments`,
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    body: formData,
    schema: z.array(AttachmentJsonSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns all comments for an issue. Results can be ordered by the 'created' field which means the date a comment was
 * added.
 */
export async function getComments(client: Client, parameters: GetComments): Promise<CommentsWithPaginationJson> {
  const config: SendRequestOptions<CommentsWithPaginationJson> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      maxResults: parameters.maxResults,
      orderBy: parameters.orderBy,
      startAt: parameters.startAt,
    },
    schema: CommentsWithPaginationJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Adds a new comment to an issue. */
export async function addComment(client: Client, parameters: AddComment): Promise<CommentJson> {
  const config: SendRequestOptions<CommentJson> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment`,
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      author: parameters.author,
      body: parameters.body,
      created: parameters.created,
      id: parameters.id,
      properties: parameters.properties,
      renderedBody: parameters.renderedBody,
      self: parameters.self,
      updateAuthor: parameters.updateAuthor,
      updated: parameters.updated,
      visibility: parameters.visibility,
    },
    schema: CommentJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a single comment. */
export async function getComment(client: Client, parameters: GetComment): Promise<CommentJson> {
  const config: SendRequestOptions<CommentJson> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: CommentJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Updates an existing comment using its JSON representation. */
export async function updateComment(client: Client, parameters: UpdateComment): Promise<CommentJson> {
  const config: SendRequestOptions<CommentJson> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: CommentJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes an existing comment. */
export async function deleteComment(client: Client, parameters: DeleteComment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Pins a comment to the top of the comment list. */
export async function setPinComment(client: Client, parameters: SetPinComment): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/comment/${parameters.id}/pin`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the meta data for editing an issue. The fields in the editmeta correspond to the fields in the edit screen
 * for the issue. Fields not in the screen will not be in the editmeta.
 */
export async function getEditIssueMeta(client: Client, parameters: GetEditIssueMeta): Promise<EditMeta> {
  const config: SendRequestOptions<EditMeta> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/editmeta`,
    method: 'GET',
    schema: EditMetaSchema,
  };

  return await client.sendRequest(config);
}

/** Sends a notification (email) to the list or recipients defined in the request. */
export async function notify(client: Client, parameters: Notify): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
    method: 'POST',
    body: {
      htmlBody: parameters.htmlBody,
      restrict: parameters.restrict,
      subject: parameters.subject,
      textBody: parameters.textBody,
      to: parameters.to,
    },
  };

  return await client.sendRequest(config);
}

/** Returns all pinned to the issue comments. */
export async function getPinnedComments(client: Client, parameters: GetPinnedComments): Promise<PinnedCommentJson[]> {
  const config: SendRequestOptions<PinnedCommentJson[]> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/pinned-comments`,
    method: 'GET',
    schema: z.array(PinnedCommentJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Returns the keys of all properties for the issue identified by the key or by the id. */
export async function getIssuePropertyKeys(
  client: Client,
  parameters: GetIssuePropertyKeys,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the property with a given key from the issue identified by the key or by the id. */
export async function getIssueProperty(client: Client, parameters: GetIssueProperty): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/** Sets the value of the specified issue's property. */
export async function setIssueProperty(client: Client, parameters: SetIssueProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Removes the property from the issue identified by the key or by the id. */
export async function deleteIssueProperty(client: Client, parameters: DeleteIssueProperty): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Get remote issue links for an issue. */
export async function getRemoteIssueLinks(client: Client, parameters: GetRemoteIssueLinks): Promise<RemoteIssueLink[]> {
  const config: SendRequestOptions<RemoteIssueLink[]> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'GET',
    searchParams: {
      globalId: parameters.globalId,
    },
    schema: z.array(RemoteIssueLinkSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Creates or updates a remote issue link from a JSON representation. If a globalId is provided and a remote issue link
 * exists with that globalId, the remote issue link is updated. Otherwise, the remote issue link is created.
 */
export async function createOrUpdateRemoteIssueLink(
  client: Client,
  parameters: CreateOrUpdateRemoteIssueLink,
): Promise<RemoteIssueLink> {
  const config: SendRequestOptions<RemoteIssueLink> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'POST',
    body: {
      application: parameters.application,
      globalId: parameters.globalId,
      object: parameters.object,
      relationship: parameters.relationship,
    },
    schema: RemoteIssueLinkSchema,
  };

  return await client.sendRequest(config);
}

/** Delete the remote issue link with the given global id on the issue. */
export async function deleteRemoteIssueLinkByGlobalId(
  client: Client,
  parameters: DeleteRemoteIssueLinkByGlobalId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
    method: 'DELETE',
    searchParams: {
      globalId: parameters.globalId,
    },
  };

  return await client.sendRequest(config);
}

/** Get a remote issue link by its id. */
export async function getRemoteIssueLinkById(
  client: Client,
  parameters: GetRemoteIssueLinkById,
): Promise<RemoteIssueLink> {
  const config: SendRequestOptions<RemoteIssueLink> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'GET',
    schema: RemoteIssueLinkSchema,
  };

  return await client.sendRequest(config);
}

/** Updates a remote issue link from a JSON representation. Any fields not provided are set to null. */
export async function updateRemoteIssueLink(client: Client, parameters: UpdateRemoteIssueLink): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'PUT',
    body: {
      application: parameters.application,
      globalId: parameters.globalId,
      object: parameters.object,
      relationship: parameters.relationship,
    },
  };

  return await client.sendRequest(config);
}

/** Delete the remote issue link with the given id on the issue. */
export async function deleteRemoteIssueLinkById(client: Client, parameters: DeleteRemoteIssueLinkById): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Restores an archived issue. */
export async function restoreIssue(client: Client, parameters: RestoreIssue): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/restore`,
    method: 'PUT',
    searchParams: {
      notifyUsers: parameters.notifyUsers,
    },
  };

  return await client.sendRequest(config);
}

/** Returns an issue's subtask list */
export async function getSubTasks(client: Client, parameters: GetSubTasks): Promise<IssueRefJson[]> {
  const config: SendRequestOptions<IssueRefJson[]> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/subtask`,
    method: 'GET',
    schema: z.array(IssueRefJsonSchema),
  };

  return await client.sendRequest(config);
}

/** Checks if a subtask can be moved */
export async function canMoveSubTask(client: Client, parameters: CanMoveSubTask): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/subtask/move`,
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/** Reorders an issue's subtasks by moving the subtask at index 'from' to index 'to'. */
export async function moveSubTasks(client: Client, parameters: MoveSubTasks): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/subtask/move`,
    method: 'POST',
    body: {
      current: parameters.current,
      original: parameters.original,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Get a list of the transitions possible for this issue by the current user, along with fields that are required and
 * their types. Fields will only be returned if `expand=transitions.fields`. The fields in the metadata correspond to
 * the fields in the transition screen for that transition. Fields not in the screen will not be in the metadata.
 */
export async function getTransitions(client: Client, parameters: GetTransitions): Promise<TransitionsMeta> {
  const config: SendRequestOptions<TransitionsMeta> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
    method: 'GET',
    searchParams: {
      transitionId: parameters.transitionId,
    },
    schema: TransitionsMetaSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Perform a transition on an issue. When performing the transition you can update or set other issue fields. The fields
 * that can be set on transition, in either the fields parameter or the update parameter can be determined using the
 * /rest/api/2/issue/{issueIdOrKey}/transitions?expand=transitions.fields resource. If a field is not configured to
 * appear on the transition screen, then it will not be in the transition metadata, and a field validation error will
 * occur if it is submitted. The updateHistory param adds the issues retrieved by this method to the current user's
 * issue history, if set to true (by default, the issue history does not include issues retrieved via the REST API). You
 * can view the issue history in the Jira application, via the Issues dropdown or by using the lastViewed JQL field in
 * an issue search.
 */
export async function doTransition(client: Client, parameters: DoTransition): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
    method: 'POST',
    body: {
      fields: parameters.fields,
      historyMetadata: parameters.historyMetadata,
      properties: parameters.properties,
      transition: parameters.transition,
      update: parameters.update,
    },
  };

  return await client.sendRequest(config);
}

/** A REST sub-resource representing the voters on the issue. */
export async function getVotes(client: Client, parameters: GetVotes): Promise<Vote> {
  const config: SendRequestOptions<Vote> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
    method: 'GET',
    schema: VoteSchema,
  };

  return await client.sendRequest(config);
}

/** Adds voter (currently logged user) to particular ticket. You need to be logged in to use this method. */
export async function addVote(client: Client, parameters: AddVote): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
    method: 'POST',
  };

  return await client.sendRequest(config);
}

/** Remove your vote from an issue. */
export async function removeVote(client: Client, parameters: RemoveVote): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/votes`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Returns the list of watchers for the issue with the given key. */
export async function getIssueWatchers(client: Client, parameters: GetIssueWatchers): Promise<Watchers> {
  const config: SendRequestOptions<Watchers> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'GET',
    schema: WatchersSchema,
  };

  return await client.sendRequest(config);
}

/** Adds a user to an issue's watcher list. */
export async function addWatcher(client: Client, parameters: AddWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'POST',
    searchParams: {
      userName: parameters.userName,
    },
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Removes a user from an issue's watcher list. */
export async function removeWatcher(client: Client, parameters: RemoveWatcher): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
    method: 'DELETE',
    searchParams: {
      userName: parameters.userName,
      username: parameters.username,
    },
  };

  return await client.sendRequest(config);
}

/** Returns all work logs for an issue. Work logs won't be returned if the Log work field is hidden for the project. */
export async function getIssueWorklog(client: Client, parameters: GetIssueWorklog): Promise<WorklogWithPagination> {
  const config: SendRequestOptions<WorklogWithPagination> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
    method: 'GET',
    schema: WorklogWithPaginationSchema,
  };

  return await client.sendRequest(config);
}

/** Adds a new worklog entry to an issue. */
export async function addWorklog(client: Client, parameters: AddWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
    method: 'POST',
    searchParams: {
      newEstimate: parameters.newEstimate,
      adjustEstimate: parameters.adjustEstimate,
      reduceBy: parameters.reduceBy,
    },
    body: {
      author: parameters.author,
      comment: parameters.comment,
      created: parameters.created,
      id: parameters.id,
      issueId: parameters.issueId,
      self: parameters.self,
      started: parameters.started,
      timeSpent: parameters.timeSpent,
      timeSpentSeconds: parameters.timeSpentSeconds,
      updateAuthor: parameters.updateAuthor,
      updated: parameters.updated,
      visibility: parameters.visibility,
    },
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a specific worklog. The work log won't be returned if the Log work field is hidden for the project. */
export async function getWorklog(client: Client, parameters: GetWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'GET',
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates an existing worklog entry. Note that:
 *
 * - Fields possible for editing are: comment, visibility, started, timeSpent and timeSpentSeconds.
 * - Either timeSpent or timeSpentSeconds can be set.
 * - Fields which are not set will not be updated.
 * - For a request to be valid, it has to have at least one field change.
 */
export async function updateWorklog(client: Client, parameters: UpdateWorklog): Promise<Worklog> {
  const config: SendRequestOptions<Worklog> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'PUT',
    searchParams: {
      newEstimate: parameters.newEstimate,
      adjustEstimate: parameters.adjustEstimate,
    },
    body: parameters.body,
    schema: WorklogSchema,
  };

  return await client.sendRequest(config);
}

/** Deletes an existing worklog entry. */
export async function deleteWorklog(client: Client, parameters: DeleteWorklog): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      newEstimate: parameters.newEstimate,
      adjustEstimate: parameters.adjustEstimate,
      increaseBy: parameters.increaseBy,
    },
  };

  return await client.sendRequest(config);
}
