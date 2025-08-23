import { z } from 'zod';

/** The request for updating the default project classification level. */
export const UpdateDefaultProjectClassificationBeanSchema = z.object({
  /** The ID of the project classification. */
  id: z.string(),
});

export type UpdateDefaultProjectClassificationBean = z.infer<typeof UpdateDefaultProjectClassificationBeanSchema>;
