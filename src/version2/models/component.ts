import { User } from './user';

/**
 * Details about a project component. */
export interface Component {
  /** The URL of the component. */
  self?: string;
  /** The unique identifier for the component. */
  id?: string;
  /** The unique name for the component in the project. Required when creating a component. Optional when updating a component. The maximum length is 255 characters. */
  name?: string;
  /** The description for the component. Optional when creating or updating a component. */
  description?: string;
  lead?: User;
  /** This property is no longer available and will be removed from the documentation soon. See the [deprecation notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/) for details. */
  leadUserName?: string;
  /** The accountId of the component's lead user. The accountId uniquely identifies the user across all Atlassian products. For example, *5b10ac8d82e05b22cc7d4ef5*. */
  leadAccountId?: string;
  /** The nominal user type used to determine the assignee for issues created with this component. See `realAssigneeType` for details on how the type of the user, and hence the user, assigned to issues is determined. Can take the following values:

   *  `PROJECT_LEAD` the assignee to any issues created with this component is nominally the lead for the project the component is in.
   *  `COMPONENT_LEAD` the assignee to any issues created with this component is nominally the lead for the component.
   *  `UNASSIGNED` an assignee is not set for issues created with this component.
   *  `PROJECT_DEFAULT` the assignee to any issues created with this component is nominally the default assignee for the project that the component is in.

   Default value: `PROJECT_DEFAULT`.
   Optional when creating or updating a component. */
  assigneeType?: string;
  assignee?: User;
  /** The type of the assignee that is assigned to issues created with this component, when an assignee cannot be set from the `assigneeType`. For example, `assigneeType` is set to `COMPONENT_LEAD` but no component lead is set. This property is set to one of the following values:

   *  `PROJECT_LEAD` when `assigneeType` is `PROJECT_LEAD` and the project lead has permission to be assigned issues in the project that the component is in.
   *  `COMPONENT_LEAD` when `assignee`Type is `COMPONENT_LEAD` and the component lead has permission to be assigned issues in the project that the component is in.
   *  `UNASSIGNED` when `assigneeType` is `UNASSIGNED` and Jira is configured to allow unassigned issues.
   *  `PROJECT_DEFAULT` when none of the preceding cases are true. */
  realAssigneeType?: string;
  realAssignee?: User;
  /** Whether a user is associated with `assigneeType`. For example, if the `assigneeType` is set to `COMPONENT_LEAD` but the component lead is not set, then `false` is returned. */
  isAssigneeTypeValid?: boolean;
  /** The key of the project the component is assigned to. Required when creating a component. Can't be updated. */
  project?: string;
  /** The ID of the project the component is assigned to. */
  projectId?: number;
}
