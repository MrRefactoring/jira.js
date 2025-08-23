import { z } from 'zod';

export const GetEventsParametersSchema = z.object({});

export type GetEventsParameters = z.infer<typeof GetEventsParametersSchema>;
