import { z } from 'zod';

export const StringListSchema = z.object({});

export type StringList = z.infer<typeof StringListSchema>;
