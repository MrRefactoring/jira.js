import { z } from 'zod';

export const GetPlansParametersSchema = z.object({
  /** Whether to include trashed plans in the results. */
  includeTrashed: z.boolean().optional(),
  /** Whether to include archived plans in the results. */
  includeArchived: z.boolean().optional(),
  /** The cursor to start from. If not provided, the first page will be returned. */
  cursor: z.string().optional(),
  /** The maximum number of plans to return per page. The maximum value is 50. The default value is 50. */
  maxResults: z.number().int().optional(),
});

export type GetPlansParameters = z.infer<typeof GetPlansParametersSchema>;
