import { z } from 'zod';

export const GetAllBoardsSchema = z.object({
  /**
   * The starting index of the returned boards. Base index: 0. See the 'Pagination' section at the top of this page for
   * more details.
   */
  startAt: z.number().optional(),
  /**
   * The maximum number of boards to return per page. See the 'Pagination' section at the top of this page for more
   * details.
   */
  maxResults: z.number().optional(),
  /** Filters results to boards of the specified types. Valid values: scrum, kanban, simple. */
  type: z.enum(['scrum', 'kanban', 'simple']).optional(),
  /** Filters results to boards that match or partially match the specified name. */
  name: z.string().optional(),
  /**
   * Filters results to boards that are relevant to a project. Relevance means that the jql filter defined in board
   * contains a reference to a project.
   */
  projectKeyOrId: z.string().optional(),
  accountIdLocation: z.string().optional(),
  projectLocation: z.string().optional(),
  /** Appends private boards to the end of the list. The name and type fields are excluded for security reasons. */
  includePrivate: z.boolean().optional(),
  /** If set to true, negate filters used for querying by location. By default false. */
  negateLocationFiltering: z.boolean().optional(),
  /** Ordering of the results by a given field. If not provided, values will not be sorted. Valid values: name. */
  orderBy: z.enum(['name', '-name', '+name']).optional(),
  /** List of fields to expand for each board. Valid values: admins, permissions. */
  expand: z
    .union([
      z.string(),
      z.array(z.string()),
      z.enum(['admins', 'permissions']),
      z.array(z.enum(['admins', 'permissions'])),
    ])
    .optional(),
  /**
   * Filters results to boards that are relevant to a project types. Support Jira Software, Jira Service Management.
   * Valid values: software, service_desk. By default software.
   */
  projectTypeLocation: z.array(z.string()).optional(),
  /** Filters results to boards that are relevant to a filter. Not supported for next-gen boards. */
  filterId: z.number().optional(),
});

export type GetAllBoards = z.input<typeof GetAllBoardsSchema>;
