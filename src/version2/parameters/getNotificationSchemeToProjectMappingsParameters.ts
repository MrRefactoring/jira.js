import { z } from 'zod';

export const GetNotificationSchemeToProjectMappingsParametersSchema = z.object({
  /** The index of the first item to return in a page of results (page offset). */
  startAt: z.string().optional(),
  /** The maximum number of items to return per page. */
  maxResults: z.string().optional(),
  /** The list of notifications scheme IDs to be filtered out */
  notificationSchemeId: z.array(z.string()).optional(),
  /** The list of project IDs to be filtered out */
  projectId: z.array(z.string()).optional(),
});

export type GetNotificationSchemeToProjectMappingsParameters = z.infer<
  typeof GetNotificationSchemeToProjectMappingsParametersSchema
>;
