import { z } from 'zod';

export const GetIssueNavigatorDefaultColumnsParametersSchema = z.object({});

export type GetIssueNavigatorDefaultColumnsParameters = z.infer<typeof GetIssueNavigatorDefaultColumnsParametersSchema>;
