import { z } from 'zod';

export const GetTeamsParametersSchema = z.object({
  /** The ID of the plan. */
  planId: z.number().int(),
  /** The cursor to start from. If not provided, the first page will be returned. */
  cursor: z.string().optional(),
  /** The maximum number of plan teams to return per page. The maximum value is 50. The default value is 50. */
  maxResults: z.number().int().optional(),
});

export type GetTeamsParameters = z.infer<typeof GetTeamsParametersSchema>;
