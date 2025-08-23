import { z } from 'zod';

export const GetAutoCompleteParametersSchema = z.object({});

export type GetAutoCompleteParameters = z.infer<typeof GetAutoCompleteParametersSchema>;
