import { z } from 'zod';

export const GetIssueSecuritySchemeSchema = z.object({
  /** The issue security scheme id. */
  id: z.number(),
});

export type GetIssueSecurityScheme = z.input<typeof GetIssueSecuritySchemeSchema>;
