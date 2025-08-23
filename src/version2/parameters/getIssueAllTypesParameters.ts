import { z } from 'zod';

export const GetIssueAllTypesParametersSchema = z.object({});

export type GetIssueAllTypesParameters = z.infer<typeof GetIssueAllTypesParametersSchema>;
