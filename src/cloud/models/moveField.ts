import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const MoveFieldSchema = apiObject({
  /**
   * The ID of the screen tab field after which to place the moved screen tab field. Required if `position` isn't
   * provided.
   */
  after: z.url().optional(),
  /** The named position to which the screen tab field should be moved. Required if `after` isn't provided. */
  position: openEnum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type MoveField = z.infer<typeof MoveFieldSchema>;
