import { z } from 'zod';

export const CreateUserParametersSchema = z.object({
  /** Deprecated, do not use. */
  applicationKeys: z.array(z.string()).optional(),
  /**
   * This property is no longer available. If the user has an Atlassian account, their display name is not changed. If
   * the user does not have an Atlassian account, they are sent an email asking them set up an account.
   */
  displayName: z.string().optional(),
  /** The email address for the user. */
  emailAddress: z.string(),
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  key: z.string().optional(),
  /**
   * This property is no longer available. See the [migration
   * guide](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name: z.string().optional(),
  /**
   * This property is no longer available. If the user has an Atlassian account, their password is not changed. If the
   * user does not have an Atlassian account, they are sent an email asking them set up an account.
   */
  password: z.string().optional(),
  /**
   * Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery,
   * jira-software. To create a user without product access, set this field to be an empty array.
   */
  products: z.array(z.string()),
  /** The URL of the user. */
  self: z.string().optional(),
});

export type CreateUserParameters = z.infer<typeof CreateUserParametersSchema>;
