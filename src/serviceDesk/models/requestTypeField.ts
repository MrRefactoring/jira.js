import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeFieldValueSchema } from './requestTypeFieldValue';
import { JsonTypeSchema } from './jsonType';

export const RequestTypeFieldSchema = apiObject({
  /** List of default values for the field. */
  defaultValues: z.array(RequestTypeFieldValueSchema).optional(),
  /** Description of the field. */
  description: z.string().optional(),
  /** ID of the field. */
  fieldId: z.string().optional(),
  jiraSchema: JsonTypeSchema.optional(),
  /** Name of the field. */
  name: z.string().optional(),
  /** List of preset values for the field. */
  presetValues: z.array(z.string()).optional(),
  /** Indicates if the field is required (true) or not (false). */
  required: z.boolean().optional(),
  /** List of valid values for the field. */
  validValues: z.array(RequestTypeFieldValueSchema).optional(),
  visible: z.boolean().optional(),
});

export type RequestTypeField = z.infer<typeof RequestTypeFieldSchema>;
