/** The approval configuration of a status within a workflow. Applies only to Jira Service Management approvals. */
export interface ApprovalConfiguration {
  /** Whether the approval configuration is active. */
  active: boolean;
  /**
   * How the required approval count is calculated. It may be configured to require a specific number of approvals, or
   * approval by a percentage of approvers. If the approvers source field is Approver groups, you can configure how many
   * approvals per group are required for the request to be approved. The number will be the same across all groups.
   */
  conditionType: 'number' | 'percent' | 'numberPerPrincipal' | string;
  /**
   * The number or percentage of approvals required for a request to be approved. If `conditionType` is `number`, the
   * value must be 20 or less. If `conditionType` is `percent`, the value must be 100 or less.
   */
  conditionValue: string;
  /** A list of roles that should be excluded as possible approvers. */
  exclude?: 'assignee' | 'reporter' | string;
  /** The custom field ID of the "Approvers" or "Approver Groups" field. */
  fieldId: string;
  /**
   * The custom field ID of the field used to pre-populate the Approver field. Only supports the "Affected Services"
   * field.
   */
  prePopulatedFieldId?: string;
  /** The numeric ID of the transition to be executed if the request is approved. */
  transitionApproved: string;
  /** The numeric ID of the transition to be executed if the request is declined. */
  transitionRejected: string;
}
