import { z } from 'zod';
import { apiObject } from '#/core';
import { IssueTypeInfoSchema } from './issueTypeInfo';
/** Details of an issue type hierarchy level. */

export const ProjectIssueTypesHierarchyLevelSchema = apiObject({
  /** The list of issue types in the hierarchy level. */
  issueTypes: z.array(IssueTypeInfoSchema).optional(),
  /** The level of the issue type hierarchy level. */
  level: z.number().optional(),
  /** The name of the issue type hierarchy level. */
  name: z.string().optional(),
});

export type ProjectIssueTypesHierarchyLevel = z.infer<typeof ProjectIssueTypesHierarchyLevelSchema>;
