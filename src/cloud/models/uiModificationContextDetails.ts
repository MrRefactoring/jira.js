import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** The details of a UI modification's context, which define where to activate the UI modification. */

export const UiModificationContextDetailsSchema = apiObject({
  /** The ID of the UI modification context. */
  id: z.string().optional(),
  /** Whether a context is available. For example, when a project is deleted the context becomes unavailable. */
  isAvailable: z.boolean().optional(),
  /**
   * The issue type ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all
   * issue types. Each UI modification context can have a maximum of one wildcard.
   */
  issueTypeId: z.string().optional(),
  /**
   * The portal ID of the context. Only required for Jira Service Management request create portal view
   * (`JSMRequestCreate`).
   */
  portalId: z.string().optional(),
  /**
   * The project ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all
   * projects. Each UI modification context can have a maximum of one wildcard.
   */
  projectId: z.string().optional(),
  /**
   * The request type ID of the context. Required for Jira Service Management request create portal view
   * (`JSMRequestCreate`). Optional for Agent view types (`GICAgentView`, `IssueViewAgentView`,
   * `IssueTransitionAgentView`): when set on an agent view context, the UI modification applies only to issues with
   * that request type. Omitting `requestTypeId` does not create a wildcard — it means the context is not scoped to any
   * specific request type.
   */
  requestTypeId: z.string().optional(),
  /**
   * The view type of the context. Supported values:
   *
   * - `GIC` - Jira global issue create
   * - `IssueView` - Jira issue view
   * - `IssueTransition` - Jira issue transition
   * - `JSMRequestCreate` - Jira Service Management request create portal view
   * - `GICAgentView` - Agent view variant of Jira global issue create
   * - `IssueViewAgentView` - Agent view variant of Jira issue view
   * - `IssueTransitionAgentView` - Agent view variant of Jira issue transition
   *
   * For Jira and Agent view types (`GIC`, `IssueView`, `IssueTransition`, `GICAgentView`, `IssueViewAgentView`,
   * `IssueTransitionAgentView`), null is treated as a wildcard, meaning the UI modification will be applied to all view
   * types. Each Jira or Agent context can have a maximum of one wildcard.
   *
   * Agent view contexts use `projectId` and `issueTypeId` like Jira contexts, and may optionally also set
   * `requestTypeId`. Agent view contexts must not set `portalId`.
   *
   * Wildcards are not applicable for JSM contexts.
   */
  viewType: openEnum([
    'GIC',
    'IssueView',
    'IssueTransition',
    'JSMRequestCreate',
    'GICAgentView',
    'IssueViewAgentView',
    'IssueTransitionAgentView',
  ]).optional(),
});

export type UiModificationContextDetails = z.infer<typeof UiModificationContextDetailsSchema>;
