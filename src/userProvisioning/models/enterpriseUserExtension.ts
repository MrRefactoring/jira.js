import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM enterprise user extension */

export const EnterpriseUserExtensionSchema = apiObject({
  /** Organization the user belongs to. */
  organization: z.string().optional(),
  /** Department the user belongs to. */
  department: z.string().optional(),
});

export type EnterpriseUserExtension = z.infer<typeof EnterpriseUserExtensionSchema>;
