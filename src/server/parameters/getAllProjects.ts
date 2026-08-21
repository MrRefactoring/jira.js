import { z } from 'zod';

export const GetAllProjectsSchema = z.object({
  /** Whether to include archived projects in response, default: false */
  includeArchived: z.boolean().optional(),
  /** Parameters to expand */
  expand: z.string().optional(),
  /**
   * If this parameter is set then only projects recently accessed by the current user (if not logged in then based on
   * HTTP session) will be returned (maximum count limited to the specified number but no more than 20)
   */
  recent: z.number().optional(),
  /** Whether to include only projects where current user can browse archive */
  browseArchive: z.boolean().optional(),
});

export type GetAllProjects = z.input<typeof GetAllProjectsSchema>;
