import { z } from 'zod';

export const GetPoliciesParametersSchema = z.object({
  /** A list of project identifiers. This parameter accepts a comma-separated list. */
  ids: z.string().optional(),
});

export type GetPoliciesParameters = z.infer<typeof GetPoliciesParametersSchema>;
