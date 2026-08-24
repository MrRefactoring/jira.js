import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeCreateSchema = apiObject({
  issueTypeId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  helpText: z.string().optional(),
});

export type RequestTypeCreate = z.infer<typeof RequestTypeCreateSchema>;
