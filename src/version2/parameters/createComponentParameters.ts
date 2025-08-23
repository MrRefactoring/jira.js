import { z } from 'zod';

export const CreateComponentParametersSchema = z.object({
  /** Compass component's ID. Can't be updated. Not required for creating a Project Component. */
  ari: z.string().optional(),
  /**
   * The details of the user associated with `assigneeType`, if any. See `realAssignee` for details of the user assigned
   * to issues created with this component.
   */
  assignee: z.unknown().optional(),
  /**
   * The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType`
   * for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the
   * following values:
   *
   * - `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the
   *   component is in.
   * - `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.
   * - `UNASSIGNED` an assignee is not set for issues created with this component.
   * - `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the
   *   project that the component is in.
   *
   * Default value: `PROJECT_DEFAULT`. Optional when creating or updating a component.
   */
  assigneeType: z.enum(['PROJECT_DEFAULT', 'COMPONENT_LEAD', 'PROJECT_LEAD', 'UNASSIGNED']).optional(),
  /** The description for the component. Optional when creating or updating a component. */
  description: z.string().optional(),
  /** The unique identifier for the component. */
  id: z.string().optional(),
  /**
   * Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but
   * the component lead is not set, then `false` is returned.
   */
  isAssigneeTypeValid: z.boolean().optional(),
  /** The user details for the component's lead user. */
  lead: z.unknown().optional(),
  /**
   * The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian
   * products. For example, _5b10ac8d82e05b22cc7d4ef5_.
   */
  leadAccountId: z.string().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  leadUserName: z.string().optional(),
  /** Compass component's metadata. Can't be updated. Not required for creating a Project Component. */
  metadata: z.object({}).optional(),
  /**
   * The unique name for the component in the project. Required when creating a component. Optional when updating a
   * component. The maximum length is 255 characters.
   */
  name: z.string().optional(),
  /** The key of the project the component is assigned to. Required when creating a component. Can't be updated. */
  project: z.string().optional(),
  /** The ID of the project the component is assigned to. */
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
  /** The URL of the component. */
  self: z.string().optional(),
});

export type CreateComponentParameters = z.infer<typeof CreateComponentParametersSchema>;
