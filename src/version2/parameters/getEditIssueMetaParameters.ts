import { z } from 'zod';

export const GetEditIssueMetaParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /**
   * Whether hidden fields are returned. Available to Connect app users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideScreenSecurity: z.boolean().optional(),
  /**
   * Whether non-editable fields are returned. Available to Connect app users with _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting on behalf of users with _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  overrideEditableFlag: z.boolean().optional(),
});

export type GetEditIssueMetaParameters = z.infer<typeof GetEditIssueMetaParametersSchema>;
