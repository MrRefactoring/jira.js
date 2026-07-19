import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';
/** A default value associated with an issue type within a context. */

export const IssueTypeDefaultValueSchema = apiObject({
  /**
   * True when this default value applies to every issue type covered by the context (no specific issue type). Only
   * present when true; omitted otherwise.
   */
  isAnyIssueType: z.boolean().nullish(),
  /** The ID of the issue type this default value applies to. Null when isAnyIssueType is true. */
  issueTypeId: z.string().nullish(),
  value: CustomFieldContextDefaultValueSchema.optional(),
});

export type IssueTypeDefaultValue = z.infer<typeof IssueTypeDefaultValueSchema>;
