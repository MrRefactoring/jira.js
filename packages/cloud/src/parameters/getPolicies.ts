import { z } from 'zod';

export const GetPoliciesSchema = z.object({
  /** A list of project identifiers. This parameter accepts a comma-separated list. */
  ids: z.union([z.string(), z.array(z.string())]).optional(),
});

export type GetPolicies = z.input<typeof GetPoliciesSchema>;
