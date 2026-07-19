import { z } from 'zod';
import { apiObject } from '#/core';

export const GetDateFieldResponseSchema = apiObject({
  /** A date custom field ID. This is returned if the type is "DateCustomField". */
  dateCustomFieldId: z.number().optional(),
  /** The date field type. This is "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: z.enum(['DueDate', 'TargetStartDate', 'TargetEndDate', 'DateCustomField']),
});

export type GetDateFieldResponse = z.infer<typeof GetDateFieldResponseSchema>;
