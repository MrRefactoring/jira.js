import { z } from 'zod';

export const GetStatusesParametersSchema = z.object({});

export type GetStatusesParameters = z.infer<typeof GetStatusesParametersSchema>;
