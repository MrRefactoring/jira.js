import { z } from 'zod';

export const GetProjectIssueSecuritySchemeSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: z.string(),
});

export type GetProjectIssueSecurityScheme = z.input<typeof GetProjectIssueSecuritySchemeSchema>;
