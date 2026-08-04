import { z } from 'zod';
import { apiObject } from '#/core';
/** The list of required status mappings by issue type. */

export const RequiredMappingByIssueTypeSchema = apiObject({
  /** The ID of the issue type. */
  issueTypeId: z.string().optional(),
  /** The status IDs requiring mapping. */
  statusIds: z.array(z.string()).optional(),
});

export type RequiredMappingByIssueType = z.infer<typeof RequiredMappingByIssueTypeSchema>;
