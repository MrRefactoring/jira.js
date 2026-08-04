import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const CreateDateFieldRequestSchema = apiObject({
  /** A date custom field ID. This is required if the type is "DateCustomField". */
  dateCustomFieldId: z.number().optional(),
  /** The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: openEnum(['DueDate', 'TargetStartDate', 'TargetEndDate', 'DateCustomField']),
});

export type CreateDateFieldRequest = z.infer<typeof CreateDateFieldRequestSchema>;
