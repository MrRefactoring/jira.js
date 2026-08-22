import { z } from 'zod';

export const GetProjectIssueSecuritySchemeSchema = z.object({
  /** The project id or project key */
  projectKeyOrId: z.string(),
});

export type GetProjectIssueSecurityScheme = z.input<typeof GetProjectIssueSecuritySchemeSchema>;
