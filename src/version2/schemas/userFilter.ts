import { z } from 'zod';

/** Filter for a User Picker (single) custom field. */
export const UserFilterSchema = z.object({
  /** Whether the filter is enabled. */
  enabled: z.boolean(),
  /**
   * User groups autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum
   * of 10 groups can be provided.
   */
  groups: z.array(z.string()).optional(),
  /**
   * Roles that autocomplete suggestion users must belong to. If not provided, the default values are used. A maximum of
   * 10 roles can be provided.
   */
  roleIds: z.array(z.number().int()).optional(),
});

export type UserFilter = z.infer<typeof UserFilterSchema>;
