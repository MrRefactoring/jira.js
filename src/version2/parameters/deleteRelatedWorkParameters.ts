import { z } from 'zod';

export const DeleteRelatedWorkParametersSchema = z.object({
  /** The ID of the version that the target related work belongs to. */
  versionId: z.string(),
  /** The ID of the related work to delete. */
  relatedWorkId: z.string(),
});

export type DeleteRelatedWorkParameters = z.infer<typeof DeleteRelatedWorkParametersSchema>;
