import { z } from 'zod';
import { apiObject } from '#/core';
/** Identifies attributes to be displayed */

export const ObjectTypeAttributesToDisplaySchema = apiObject({
  /** The identifier of the object type attributes to be displayed */
  attributesToDisplayIds: z.array(z.string()),
});

export type ObjectTypeAttributesToDisplay = z.infer<typeof ObjectTypeAttributesToDisplaySchema>;
