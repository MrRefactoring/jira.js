import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeDefaultValueUpdateSchema } from './issueTypeDefaultValueUpdate';

/** Default value updates grouped by context and issue type. */
export const CustomFieldContextDefaultValuesUpdateSchema = apiObject({
  /** The default values to update. */
  defaultValues: z.array(IssueTypeDefaultValueUpdateSchema).optional(),
});

export type CustomFieldContextDefaultValuesUpdate = z.infer<typeof CustomFieldContextDefaultValuesUpdateSchema>;
