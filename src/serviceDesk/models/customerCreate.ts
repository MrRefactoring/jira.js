import { z } from 'zod';
import { apiObject } from '#/core';

export const CustomerCreateSchema = apiObject({
  /** Customer's name for display in the UI. */
  displayName: z.string().optional(),
  /** Customer's email address. */
  email: z.string().optional(),
  /** Deprecated, please use 'displayName'. */
  fullName: z.string().optional(),
});

export type CustomerCreate = z.infer<typeof CustomerCreateSchema>;
