import { z } from 'zod';

export const DeleteComponentsByPropertySchema = z.object({
  /**
   * Property key used to select which submitted DevOps components to delete. Must match a key previously sent in
   * submitComponents `properties` (string values, max 5 properties, keys cannot contain ':' or start with '_').
   * Example: accountId=account-123.
   */
  accountId: z.string().max(255, 'accountId must be at most 255 characters'),
  /**
   * Optional additional property filter combined with accountId (AND). Must match a key previously supplied in
   * submitComponents `properties`. Example: createdBy=user-456.
   */
  createdBy: z.string().max(255, 'createdBy must be at most 255 characters').optional(),
});

export type DeleteComponentsByProperty = z.input<typeof DeleteComponentsByPropertySchema>;
