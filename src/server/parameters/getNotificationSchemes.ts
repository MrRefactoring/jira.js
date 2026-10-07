import { z } from 'zod';
import { openEnum } from '#/core';

export const GetNotificationSchemesSchema = z.object({
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
  /** The maximum number of notification schemes to return (max 50). */
  maxResults: z.number().optional(),
  /** The index of the first notification scheme to return (0 based). */
  startAt: z.number().optional(),
});

export type GetNotificationSchemes = z.input<typeof GetNotificationSchemesSchema>;
