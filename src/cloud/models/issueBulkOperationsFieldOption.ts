import type { z } from 'zod';
import { apiObject } from '#/core';

export const IssueBulkOperationsFieldOptionSchema = apiObject({});

export type IssueBulkOperationsFieldOption = z.infer<typeof IssueBulkOperationsFieldOptionSchema>;
