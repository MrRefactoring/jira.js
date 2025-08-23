import { z } from 'zod';
import { EntityPropertySchema } from './entityProperty';

export const EditIssueParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Whether a notification email about the issue update is sent to all watchers. To disable the notification,
   * administer Jira or administer project permissions are required. If the user doesn't have the necessary permission
   * the request is ignored.
   */
  notifyUsers: z.boolean().optional(),
  /**
   * Whether screen security is overridden to enable hidden fields to be edited. Available to Connect app users with
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of
   * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideScreenSecurity: z.boolean().optional(),
  /**
   * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect app users with
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of
   * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideEditableFlag: z.boolean().optional(),
  /**
   * Whether the response should contain the issue with fields edited in this request. The returned issue will have the
   * same format as in the [Get issue API](#api-rest-api-3-issue-issueidorkey-get).
   */
  returnIssue: z.boolean().optional(),
  /** The Get issue API expand parameter to use in the response if the `returnIssue` parameter is `true`. */
  expand: z.string().optional(),
  /**
   * List of issue screen fields to update, specifying the sub-field to update and its value for each field. This field
   * provides a straightforward option when setting a sub-field. When multiple sub-fields or other operations are
   * required, use `update`. Fields included in here cannot be included in `update`.
   */
  fields: z.object({}).optional(),
  /** Additional issue history details. */
  historyMetadata: z.unknown().optional(),
  /** Details of issue properties to be add or update. */
  properties: z.array(EntityPropertySchema).optional(),
  /** Details of a transition. Required when performing a transition, optional when creating or editing an issue. */
  transition: z.unknown().optional(),
  /**
   * A Map containing the field field name and a list of operations to perform on the issue screen field. Note that
   * fields included in here cannot be included in `fields`.
   */
  update: z.object({}).optional(),
});

export type EditIssueParameters = z.infer<typeof EditIssueParametersSchema>;
