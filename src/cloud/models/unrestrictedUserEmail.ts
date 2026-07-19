import { z } from 'zod';
import { apiObject } from '#/core';

export const UnrestrictedUserEmailSchema = apiObject({
  /** The accountId of the user */
  accountId: z.string().optional(),
  /** The email of the user */
  email: z.string().optional(),
});

export type UnrestrictedUserEmail = z.infer<typeof UnrestrictedUserEmailSchema>;
