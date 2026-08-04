import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** A group label. */

export const GroupLabelSchema = apiObject({
  /** The group label name. */
  text: z.string().optional(),
  /** The title of the group label. */
  title: z.string().optional(),
  /** The type of the group label. */
  type: openEnum(['ADMIN', 'SINGLE', 'MULTIPLE']).optional(),
});

export type GroupLabel = z.infer<typeof GroupLabelSchema>;
