import { z } from 'zod';
import { LicensedApplicationSchema } from './licensedApplication';

/** Details about a license for the Jira instance. */
export const LicenseSchema = z.object({
  /** The applications under this license. */
  applications: z.array(LicensedApplicationSchema),
});

export type License = z.infer<typeof LicenseSchema>;
