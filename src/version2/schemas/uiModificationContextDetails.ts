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
   * The project ID of the context. Null is treated as a wildcard, meaning the UI modification will be applied to all
   * projects. Each UI modification context can have a maximum of one wildcard.
   */
  projectId: z.string().optional(),
  /**
   * The view type of the context. Only `GIC`(Global Issue Create), `IssueView` and `IssueTransition` are supported.
   * Null is treated as a wildcard, meaning the UI modification will be applied to all view types. Each UI modification
   * context can have a maximum of one wildcard.
   */
  viewType: z.enum(['GIC', 'IssueView', 'IssueTransition']).optional(),
});

export type UiModificationContextDetails = z.infer<typeof UiModificationContextDetailsSchema>;
