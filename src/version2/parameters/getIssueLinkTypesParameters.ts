import { z } from 'zod';

export const GetIssueLinkTypesParametersSchema = z.object({});

export type GetIssueLinkTypesParameters = z.infer<typeof GetIssueLinkTypesParametersSchema>;
