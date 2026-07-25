import { z } from 'zod';

export const DeleteRemoteLinksByPropertySchema = z.object({
  /**
   * Free-form query parameters to specify which properties to delete by. Properties refer to the arbitrary information
   * the provider tagged Remote Links with previously.
   *
   * For example, if the provider previously tagged a remote link with accountId: "properties": { "accountId":
   * "account-123" }
   *
   * And now they want to delete Remote Links in bulk by that specific accountId as follows: e.g. DELETE
   * /bulkByProperties?accountId=account-123
   */
  params: z.record(z.string(), z.any()).optional(),
});

export type DeleteRemoteLinksByProperty = z.input<typeof DeleteRemoteLinksByPropertySchema>;
