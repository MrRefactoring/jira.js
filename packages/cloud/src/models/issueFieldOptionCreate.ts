import { z } from 'zod';
import { IssueFieldOptionConfigurationSchema } from '#/models/issueFieldOptionConfiguration';

export const IssueFieldOptionCreateSchema = z.object({
  config: IssueFieldOptionConfigurationSchema.optional(),
  /**
   * The properties of the option as arbitrary key-value pairs. These properties can be searched using JQL, if the
   * extractions (see https://developer.atlassian.com/cloud/jira/platform/modules/issue-field-option-property-index/)
   * are defined in the descriptor for the issue field module.
   */
  properties: z.record(z.string(), z.any()).optional(),
  /** The option's name, which is displayed in Jira. */
  value: z.string(),
});

export type IssueFieldOptionCreate = z.infer<typeof IssueFieldOptionCreateSchema>;
