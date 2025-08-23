import { z } from 'zod';

export const GetServerInfoParametersSchema = z.object({});

export type GetServerInfoParameters = z.infer<typeof GetServerInfoParametersSchema>;
