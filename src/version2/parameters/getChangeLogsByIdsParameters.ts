import { z } from 'zod';

export const GetChangeLogsByIdsParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  /** The list of changelog IDs. */
  changelogIds: z.array(z.number().int()),
});

export type GetChangeLogsByIdsParameters = z.infer<typeof GetChangeLogsByIdsParametersSchema>;
