import { z } from 'zod';

export const GetProjectNotificationSchemeSchema = z.object({
  /** Optional information to be expanded in the response: group, user, projectRole or field. */
  expand: z.string().optional(),
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type GetProjectNotificationScheme = z.input<typeof GetProjectNotificationSchemeSchema>;
