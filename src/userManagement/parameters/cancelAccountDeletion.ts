import { z } from 'zod';
import { AccountIdSchema } from '../models';

export const CancelAccountDeletionSchema = z.object({
  /**
   * Unique ID of the user's account that you are deleting. Use the [Get users in an organization
   * API](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-users/#api-orgs-orgid-users-get) to
   * get the accountId.
   */
  accountId: AccountIdSchema,
});

export type CancelAccountDeletion = z.input<typeof CancelAccountDeletionSchema>;
