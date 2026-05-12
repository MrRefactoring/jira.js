import { z } from 'zod';

export const IssueBulkOperationsFieldOptionSchema = z.object({});

export type IssueBulkOperationsFieldOption = z.infer<typeof IssueBulkOperationsFieldOptionSchema>;
