import { z } from 'zod';
import { openEnum } from '#/core';
import { AccountIdSchema } from '../models';

export const GetManagementPermissionsSchema = z.object({
  /** The user account to manage */
  accountId: AccountIdSchema,
  privileges: z
    .array(
      openEnum([
        'profile',
        'profile.write',
        'profile.read',
        'email.set',
        'lifecycle.enablement',
        'lifecycle.delete',
        'apiToken.read',
        'apiToken.delete',
      ]),
    )
    .optional(),
});

export type GetManagementPermissions = z.input<typeof GetManagementPermissionsSchema>;
