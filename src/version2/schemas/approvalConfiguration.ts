import { z } from 'zod';

/** The approval configuration of a status within a workflow. Applies only to Jira Service Management approvals. */
export const ApprovalConfigurationSchema = z.object({
  /** Whether the approval configuration is active. */
  active: z.enum(['true', 'false']),
  /**
   * How the required approval count is calculated. It may be configured to require a specific number of approvals, or
   * approval by a percentage of approvers. If the approvers source field is Approver groups, you can configure how many
   * approvals per group are required for the request to be approved. The number will be the same across all groups.
   */
  conditionType: z.enum(['number', 'percent', 'numberPerPrincipal']),
  /**
   * The number or percentage of approvals required for a request to be approved. If `conditionType` is `number`, the
   * value must be 20 or less. If `conditionType` is `percent`, the value must be 100 or less.
   */
  conditionValue: z.string(),
  /** A list of roles that should be excluded as possible approvers. */
  exclude: z.array(z.enum(['assignee', 'reporter'])).optional(),
  /** The custom field ID of the "Approvers" or "Approver Groups" field. */
  fieldId: z.string(),
  /**
   * The custom field ID of the field used to pre-populate the Approver field. Only supports the "Affected Services"
   * field.
   */
  prePopulatedFieldId: z.string().optional(),
  /** The numeric ID of the transition to be executed if the request is approved. */
  transitionApproved: z.string(),
  /** The numeric ID of the transition to be executed if the request is declined. */
  transitionRejected: z.string(),
});

export type ApprovalConfiguration = z.infer<typeof ApprovalConfigurationSchema>;
