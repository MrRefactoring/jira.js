import { z } from 'zod';

export const GetIssuePickerResourceSchema = z.object({
  /** The id of the project in context of which the request is executed */
  currentProjectId: z.string().optional(),
  /** The query */
  query: z.string().optional(),
  /** The key of the issue in context of which the request is executed */
  currentIssueKey: z.string().optional(),
  /** If set to false, subtasks will not be included in the list */
  showSubTasks: z.string().optional(),
  /** The JQL in context of which the request is executed */
  currentJQL: z.string().optional(),
  /**
   * If set to false and request is executed in context of a subtask, the parent issue will not be included in the
   * auto-completion result, even if it matches the query
   */
  showSubTaskParent: z.string().optional(),
});

export type GetIssuePickerResource = z.input<typeof GetIssuePickerResourceSchema>;
