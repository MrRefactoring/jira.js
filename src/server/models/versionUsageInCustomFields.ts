import { z } from 'zod';
import { apiObject } from '#/core';

export const VersionUsageInCustomFieldsSchema = apiObject({
  customFieldId: z.number().optional(),
  fieldName: z.string().optional(),
  issueCountWithVersionInCustomField: z.number().optional(),
});

export type VersionUsageInCustomFields = z.infer<typeof VersionUsageInCustomFieldsSchema>;
