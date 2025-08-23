import { z } from 'zod';
import { IssueFieldOptionConfigurationSchema } from './issueFieldOptionConfiguration';

/** Details of the options for a select list issue field. */
export const IssueFieldOptionSchema = z.object({
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

export type IssueFieldOption = z.infer<typeof IssueFieldOptionSchema>;
