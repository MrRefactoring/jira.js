import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM user phone number */

export const ScimUserPhoneNumberSchema = apiObject({
  /** Phone number. */
  value: z.string().optional(),
  /** Type of phone number, for example `work` or `personal` */
  type: z.string().optional(),
  /** Boolean value indicating whether phone number is primary. */
  primary: z.boolean().optional(),
});

export type ScimUserPhoneNumber = z.infer<typeof ScimUserPhoneNumberSchema>;
