import { z } from 'zod';

export const CreateDateFieldRequestSchema = z.object({
  /** A date custom field ID. This is required if the type is "DateCustomField". */
  dateCustomFieldId: z.number().int().optional(),
  /** The date field type. This must be "DueDate", "TargetStartDate", "TargetEndDate" or "DateCustomField". */
  type: z.enum(['DueDate', 'TargetStartDate', 'TargetEndDate', 'DateCustomField']),
});

export type CreateDateFieldRequest = z.infer<typeof CreateDateFieldRequestSchema>;
