import { z } from 'zod';
import { openEnum } from '#/core';

export const GetNotificationSchemeSchema = z.object({
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
  /** The id of the notification scheme to retrieve */
  id: z.number(),
});

export type GetNotificationScheme = z.input<typeof GetNotificationSchemeSchema>;
