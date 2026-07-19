import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectIssueTypesHierarchyLevelSchema } from './projectIssueTypesHierarchyLevel';
/** The hierarchy of issue types within a project. */

export const ProjectIssueTypeHierarchySchema = apiObject({
  /** Details of an issue type hierarchy level. */
  hierarchy: z.array(ProjectIssueTypesHierarchyLevelSchema).optional(),
  /** The ID of the project. */
  projectId: z.number().optional(),
});

export type ProjectIssueTypeHierarchy = z.infer<typeof ProjectIssueTypeHierarchySchema>;
