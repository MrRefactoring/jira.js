import { z } from 'zod';

/** The user details. */
export const NewUserDetailsSchema = z.object({
  /** The email address for the user. */
  emailAddress: z.string(),
  /**
   * Products the new user has access to. Valid products are: jira-core, jira-servicedesk, jira-product-discovery,
   * jira-software. To create a user without product access, set this field to be an empty array.
   */
  products: z.array(z.string()),
  /** The URL of the user. */
  self: z.string().optional(),
});

export type NewUserDetails = z.infer<typeof NewUserDetailsSchema>;
