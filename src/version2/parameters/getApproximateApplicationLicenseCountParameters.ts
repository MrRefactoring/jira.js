import { z } from 'zod';

export const GetApproximateApplicationLicenseCountParametersSchema = z.object({
  /** The ID of the application, represents a specific version of Jira. */
  applicationKey: z.enum(['jira-core', 'jira-product-discovery', 'jira-software', 'jira-servicedesk']),
});

export type GetApproximateApplicationLicenseCountParameters = z.infer<
  typeof GetApproximateApplicationLicenseCountParametersSchema
>;
