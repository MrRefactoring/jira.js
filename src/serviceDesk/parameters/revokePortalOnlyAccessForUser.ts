import { z } from 'zod';

export const RevokePortalOnlyAccessForUserSchema = z.object({
  /**
   * The account ID of the user, which uniquely identifies the portal-only account. For example,
   * _qm:a713c8ea-1075-4e30-9d96-891a7d181739:5ad6d3581db05e2a66fa80b_.
   */
  accountId: z.string(),
});

export type RevokePortalOnlyAccessForUser = z.input<typeof RevokePortalOnlyAccessForUserSchema>;
