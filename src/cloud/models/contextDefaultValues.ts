import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeDefaultValueSchema } from './issueTypeDefaultValue';
/** Default values grouped by custom field context. */

export const ContextDefaultValuesSchema = apiObject({
  /** The ID of the context. */
  contextId: z.number(),
  /**
   * Per-issue-type default values for this context. May contain a single entry for unconverted contexts, or one entry
   * per issue type for converted contexts.
   */
  defaultValues: z.array(IssueTypeDefaultValueSchema).optional(),
});

export type ContextDefaultValues = z.infer<typeof ContextDefaultValuesSchema>;
