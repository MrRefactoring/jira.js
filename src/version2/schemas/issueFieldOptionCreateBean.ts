import { z } from 'zod';
import { IssueFieldOptionConfigurationSchema } from './issueFieldOptionConfiguration';

export const IssueFieldOptionCreateBeanSchema = z.object({
  config: IssueFieldOptionConfigurationSchema.optional(),
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the
   * extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties: z.object({}).optional(),
  /** The option's name, which is displayed in Jira. */
  value: z.string(),
});

export type IssueFieldOptionCreateBean = z.infer<typeof IssueFieldOptionCreateBeanSchema>;
