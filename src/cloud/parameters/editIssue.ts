import { z } from 'zod';
import { IssueUpdateDetailsSchema } from '../models';

export const EditIssueSchema = z
  .object({
    /** The ID or key of the issue. */
    issueIdOrKey: z.string(),
    /**
     * Whether a notification email about the issue update is sent to all watchers. To disable the notification,
     * administer Jira or administer project permissions are required. If the user doesn't have the necessary permission
     * the request is ignored.
     */
    notifyUsers: z.boolean().optional(),
    /**
     * Whether screen security is overridden to enable hidden fields to be edited. Available to Connect and Forge app
     * users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps acting
     * on behalf of users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    overrideScreenSecurity: z.boolean().optional(),
    /**
     * Whether screen security is overridden to enable uneditable fields to be edited. Available to Connect and Forge
     * app users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) and Forge apps
     * acting on behalf of users with _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
     */
    overrideEditableFlag: z.boolean().optional(),
    /**
     * Whether the response should contain the issue with fields edited in this request. The returned issue will have
     * the same format as in the [Get issue
     * API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-get).
     */
    returnIssue: z.boolean().optional(),
    /** The Get issue API expand parameter to use in the response if the `returnIssue` parameter is `true`. */
    expand: z.string().optional(),
  })
  .extend(IssueUpdateDetailsSchema.shape);

export type EditIssue = z.input<typeof EditIssueSchema>;
