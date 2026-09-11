import { z } from 'zod';

export const GetIssueSecuritySchemeSchema = z.object({
  /** The issue security scheme id. */
  id: z.string(),
});

export type GetIssueSecurityScheme = z.input<typeof GetIssueSecuritySchemeSchema>;
