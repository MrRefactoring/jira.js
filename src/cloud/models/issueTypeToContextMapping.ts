import { z } from 'zod';
import { apiObject } from '#/core';
/** Mapping of an issue type to a context. */

export const IssueTypeToContextMappingSchema = apiObject({
  /** The ID of the context. */
  contextId: z.string(),
  /** Whether the context is mapped to any issue type. */
  isAnyIssueType: z.boolean().optional(),
  /** The ID of the issue type. */
  issueTypeId: z.string().optional(),
});

export type IssueTypeToContextMapping = z.infer<typeof IssueTypeToContextMappingSchema>;
