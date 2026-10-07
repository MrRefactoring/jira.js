import { z } from 'zod';
import { openEnum } from '#/core';

export const GetProjectNotificationSchemeSchema = z.object({
  /**
   * Optional information to be expanded in the response: group, user, projectRole or field. This parameter accepts a
   * comma-separated list.
   */
  expand: z
    .union([
      openEnum(['group', 'user', 'projectRole', 'field']),
      z.array(openEnum(['group', 'user', 'projectRole', 'field'])),
    ])
    .optional(),
  /** Key or id of the project */
  projectKeyOrId: z.string(),
});

export type GetProjectNotificationScheme = z.input<typeof GetProjectNotificationSchemeSchema>;
