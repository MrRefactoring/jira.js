import { z } from 'zod';

export const GetDomainByIdSchema = z.object({
  /**
   * Your organization has a unique ID. Find this ID in your Atlassian Administration URL or when you create your API
   * key.
   */
  orgId: z.string(),
  /** ID of the domain to return */
  domainId: z.string(),
});

export type GetDomainById = z.input<typeof GetDomainByIdSchema>;
