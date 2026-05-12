import { z } from 'zod';

/** Details about a licensed Jira application. */
export const LicensedApplicationSchema = z.object({
  /** The ID of the application. */
  id: z.string(),
  /** The licensing plan. */
  plan: z.enum(['UNLICENSED', 'FREE', 'PAID']),
});

export type LicensedApplication = z.infer<typeof LicensedApplicationSchema>;
