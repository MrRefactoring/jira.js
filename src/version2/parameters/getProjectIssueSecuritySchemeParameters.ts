import { z } from 'zod';

export const GetProjectIssueSecuritySchemeParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: z.string(),
});

export type GetProjectIssueSecuritySchemeParameters = z.infer<typeof GetProjectIssueSecuritySchemeParametersSchema>;
