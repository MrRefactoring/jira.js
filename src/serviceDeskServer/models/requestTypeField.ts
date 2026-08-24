import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeFieldValueSchema } from './requestTypeFieldValue';
import { JsonTypeSchema } from './jsonType';

export const RequestTypeFieldSchema = apiObject({
  fieldId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  validValues: z.array(RequestTypeFieldValueSchema).optional(),
  jiraSchema: JsonTypeSchema.optional(),
});

export type RequestTypeField = z.infer<typeof RequestTypeFieldSchema>;
