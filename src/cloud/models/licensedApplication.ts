import { z } from 'zod';
import { apiObject } from '#/core';
/** Details about a licensed Jira application. */

export const LicensedApplicationSchema = apiObject({
  /** The ID of the application. */
  id: z.string(),
  /** The licensing plan. */
  plan: z.enum(['UNLICENSED', 'FREE', 'PAID']),
});

export type LicensedApplication = z.infer<typeof LicensedApplicationSchema>;
