import { z } from 'zod';

/** The request for updating the default project classification level. */
export const UpdateDefaultProjectClassificationSchema = z.object({
  /** The ID of the project classification. */
  id: z.string(),
});

export type UpdateDefaultProjectClassification = z.infer<typeof UpdateDefaultProjectClassificationSchema>;
