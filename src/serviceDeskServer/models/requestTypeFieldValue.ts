import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeFieldValueSchema = apiObject({
  value: z.string().optional(),
  label: z.string().optional(),
});

export type RequestTypeFieldValue = z.infer<typeof RequestTypeFieldValueSchema>;
