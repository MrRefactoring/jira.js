import { z } from 'zod';
import { apiObject } from '#/core';
import { CustomFieldContextDefaultValueSchema } from './customFieldContextDefaultValue';

/** A default value update for one issue-type scope in a context. */
export const IssueTypeDefaultValueUpdateSchema = apiObject({
  /** The ID of the context. */
  contextId: z.number(),
  /** True when this is the catch-all default for issue types without a specific default. */
  isAnyIssueType: z.boolean().nullish(),
  /** The ID of the issue type this default value applies to. */
  issueTypeId: z.string().nullish(),
  value: CustomFieldContextDefaultValueSchema.optional(),
});

export type IssueTypeDefaultValueUpdate = z.infer<typeof IssueTypeDefaultValueUpdateSchema>;
