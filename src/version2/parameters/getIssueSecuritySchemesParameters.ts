import { z } from 'zod';

export const GetIssueSecuritySchemesParametersSchema = z.object({});

export type GetIssueSecuritySchemesParameters = z.infer<typeof GetIssueSecuritySchemesParametersSchema>;
