import { z } from 'zod';
import { apiObject } from '#/core';
/** The request for updating the default project classification level. */

export const UpdateDefaultProjectClassificationSchema = apiObject({
  /** The ID of the project classification. */
  id: z.string(),
});

export type UpdateDefaultProjectClassification = z.infer<typeof UpdateDefaultProjectClassificationSchema>;
