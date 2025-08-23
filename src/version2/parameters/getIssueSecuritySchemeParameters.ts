import { z } from 'zod';

export const GetIssueSecuritySchemeParametersSchema = z.object({
  /**
   * The ID of the issue security scheme. Use the [Get issue security schemes](#api-rest-api-2-issuesecurityschemes-get)
   * operation to get a list of issue security scheme IDs.
   */
  id: z.number().int(),
});

export type GetIssueSecuritySchemeParameters = z.infer<typeof GetIssueSecuritySchemeParametersSchema>;
