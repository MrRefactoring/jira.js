import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';

export const AddIssueTypesToContextSchema = apiObject({
  defaultValue: CustomFieldContextDefaultValueSchema.optional(),
  /**
   * Whether to add or retain the any-issue-type mapping. At least one of this property or issueTypeIds is required.
   * Defaults to false.
   */
  isAnyIssueType: z.boolean().optional(),
  /** The issue type IDs to add. Optional when isAnyIssueType is true. */
  issueTypeIds: z.array(z.string().nullable()).nullish(),
});

export type AddIssueTypesToContext = z.infer<typeof AddIssueTypesToContextSchema>;
