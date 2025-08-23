import { z } from 'zod';

/** Details about a component with a count of the issues it contains. */
export const ComponentWithIssueCountSchema = z.object({
  /**
   * The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned
   * to issues created with this component.
   */
  assignee: z.unknown().optional(),
  /**
   * The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType`
   * for details on how the type of the user, and hence the user, assigned to issues is determined. Takes the following
   * values:
   *
   * - `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the
   *   component is in.
   * - `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.
   * - `UNASSIGNED` an assignee is not set for issues created with this component.
   * - `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the
   *   project that the component is in.
   */
  assigneeType: z.enum(['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** The description for the component. */
  description: z.string().optional(),
  /** The unique identifier for the component. */
  id: z.string().optional(),
  /**
   * Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but
   * the component lead is not set, then `false` is returned.
   */
  isAssigneeTypeValid: z.boolean().optional(),
  /** Count of issues for the component. */
  issueCount: z.number().int().optional(),
  /** The user details for the component's lead user. */
  lead: z.unknown().optional(),
  /** The name for the component. */
  name: z.string().optional(),
  /** The key of the project to which the component is assigned. */
  project: z.string().optional(),
  /** Not used. */
  projectId: z.number().int().optional(),
  /** The user assigned to issues created with this component, when `assigneeType` does not identify a valid assignee. */
  realAssignee: z.unknown().optional(),
  /**
   * The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set
   * from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This
   * property is set to one of the following values:
   *
   * - `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in
   *   the project that the component is in.
   * - `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned
   *   issues in the project that the component is in.
   * - `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.
   * - `PROJECT_DEFAULT` when none of the preceding cases are true.
   */
  realAssigneeType: z.enum(['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** The URL for this count of the issues contained in the component. */
  self: z.string().optional(),
});

export type ComponentWithIssueCount = z.infer<typeof ComponentWithIssueCountSchema>;
