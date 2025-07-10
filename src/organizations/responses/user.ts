import { z } from 'zod';
import { ProductSchema } from './product';

export const UserSchema = z.strictObject({
  /** Unique ID of the users account. The format is [a-zA-Z0-9_|-:]{1,128} */
  account_id: z.string(),
  /** The type of account */
  account_type: z.enum(['atlassian', 'customer', 'app']),
  /** The lifecycle status of the account */
  account_status: z.enum(['active', 'inactive', 'closed']),
  /**
   * The display name of the user. Should be used for contextual rendering of the authorship in content. If the user has
   * restricted visibility of their name, their nickname will be displayed as a substitute value
   */
  name: z.string(),
  /**
   * The absolute URI (RFC3986) to the avatar name of the user. Should be used for contextual rendering of the
   * authorship in content. If the user has restricted visibility of their avatar, an alternative URI will be provided
   * as a substitute value
   */
  picture: z.string(),
  /**
   * The email address of the user. If the user has restricted visibility of the email address, the property will be
   * absent
   */
  email: z.string().optional(),
  /** Billable status of User in Atlassian Guard Standard */
  access_billable: z.boolean().optional(),
  /** Last active date for a user */
  last_active: z.string().optional(), // todo convert to date
  /** Products which the User is using */
  product_access: z.array(ProductSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;
