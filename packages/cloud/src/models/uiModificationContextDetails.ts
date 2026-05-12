import { z } from 'zod';

/** The details of a UI modification's context, which define where to activate the UI modification. */
export const UiModificationContextDetailsSchema = z.object({
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
   * The request type ID of the context. Only required for Jira Service Management request create portal view
   * (`JSMRequestCreate`).
   */
  requestTypeId: z.string().optional(),
  /**
   * The view type of the context. Supported values:
   *
   * - `GIC` - Jira global issue create
   * - `IssueView` - Jira issue view
   * - `IssueTransition` - Jira issue transition
   * - `JSMRequestCreate` - Jira Service Management request create portal view
   *
   * For Jira view types (`GIC`, `IssueView`, `IssueTransition`), null is treated as a wildcard, meaning the UI
   * modification will be applied to all view types. Each Jira context can have a maximum of one wildcard.
   *
   * Wildcards are not applicable for JSM contexts.
   */
  viewType: z.enum(['GIC', 'IssueView', 'IssueTransition', 'JSMRequestCreate']).optional(),
});

export type UiModificationContextDetails = z.infer<typeof UiModificationContextDetailsSchema>;
