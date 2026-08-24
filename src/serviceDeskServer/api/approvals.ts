import { ApprovalSchema, type Approval } from '../models/approval';
import { ApprovalCommentConfigSchema, type ApprovalCommentConfig } from '../models/approvalCommentConfig';
import { PagedApprovalSchema } from '../models/pagedApproval';
import type { Page } from '../models/page';
import type { GetApprovalById } from '../parameters/getApprovalById';
import type { AnswerApproval } from '../parameters/answerApproval';
import type { GetApprovalCommentConfig } from '../parameters/getApprovalCommentConfig';
import type { GetApprovals } from '../parameters/getApprovals';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns an approval for a given approval ID. */
export async function getApprovalById(
  client: Client,
  parameters: GetApprovalById,
  options?: RequestOptions,
): Promise<Approval> {
  const config: SendRequestOptions<Approval> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
    method: 'GET',
    schema: ApprovalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Answer a pending approval. */
export async function answerApproval(
  client: Client,
  parameters: AnswerApproval,
  options?: RequestOptions,
): Promise<Approval> {
  const config: SendRequestOptions<Approval> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}`,
    method: 'POST',
    body: {
      decision: parameters.decision,
      comment: parameters.comment,
      commentPublic: parameters.commentPublic,
    },
    schema: ApprovalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns approval comment config for a given approval ID. */
export async function getApprovalCommentConfig(
  client: Client,
  parameters: GetApprovalCommentConfig,
  options?: RequestOptions,
): Promise<ApprovalCommentConfig> {
  const config: SendRequestOptions<ApprovalCommentConfig> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval/${parameters.approvalId}/config`,
    method: 'GET',
    schema: ApprovalCommentConfigSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all approvals on a request, for a given request Id/key. */
export async function getApprovals(
  client: Client,
  parameters: GetApprovals,
  options?: RequestOptions,
): Promise<Page<Approval>> {
  const config: SendRequestOptions<Page<Approval>> = {
    url: `/rest/servicedeskapi/request/${parameters.issueIdOrKey}/approval`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedApprovalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
