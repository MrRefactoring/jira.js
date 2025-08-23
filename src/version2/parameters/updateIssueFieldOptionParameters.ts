import { z } from 'zod';
import { IssueFieldOptionConfigurationSchema } from './issueFieldOptionConfiguration';

export const UpdateIssueFieldOptionParametersSchema = z.object({
  /**
   * The field key is specified in the following format: **$(app-key)__$(field-key)**. For example,
   * _example-add-on__example-issue-field_. To determine the `fieldKey` value, do one of the following:
   *
   * - Open the app's plugin descriptor, then **app-key** is the key at the top and **field-key** is the key in the
   *   `jiraIssueFields` module. **app-key** can also be found in the app listing in the Atlassian Universal Plugin
   *   Manager.
   * - Run [Get fields](#api-rest-api-2-field-get) and in the field details the value is returned in `key`. For example,
   *   `"key": "teams-add-on__team-issue-field"`
   */
  fieldKey: z.string(),
  /** The ID of the option to be updated. */
  optionId: z.number().int(),
  config: IssueFieldOptionConfigurationSchema.optional(),
  /** The unique identifier for the option. This is only unique within the select field's set of options. */
  id: z.number().int(),
  /**
   * The properties of the object, as arbitrary key-value pairs. These properties can be searched using JQL, if the
   * extractions (see [Issue Field Option Property
   * Index](https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)) are defined
   * in the descriptor for the issue field module.
   */
  properties: z.object({}).optional(),
  /** The option's name, which is displayed in Jira. */
  value: z.string(),
});

export type UpdateIssueFieldOptionParameters = z.infer<typeof UpdateIssueFieldOptionParametersSchema>;
