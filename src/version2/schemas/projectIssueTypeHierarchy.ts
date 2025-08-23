import { z } from 'zod';
import { ProjectIssueTypesHierarchyLevelSchema } from './projectIssueTypesHierarchyLevel';

/** The hierarchy of issue types within a project. */
export const ProjectIssueTypeHierarchySchema = z.object({
  /** Details of an issue type hierarchy level. */
  hierarchy: z.array(ProjectIssueTypesHierarchyLevelSchema).optional(),
  /** The ID of the project. */
  projectId: z.number().int().optional(),
});

export type ProjectIssueTypeHierarchy = z.infer<typeof ProjectIssueTypeHierarchySchema>;
