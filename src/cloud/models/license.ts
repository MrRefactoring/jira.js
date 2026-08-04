import { z } from 'zod';
import { apiObject } from '#/core';
import { LicensedApplicationSchema } from './licensedApplication';
/** Details about a license for the Jira instance. */

export const LicenseSchema = apiObject({
  /** The applications under this license. */
  applications: z.array(LicensedApplicationSchema),
});

export type License = z.infer<typeof LicenseSchema>;
