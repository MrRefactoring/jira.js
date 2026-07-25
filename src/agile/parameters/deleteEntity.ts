import { z } from 'zod';

export const DeleteEntitySchema = z.object({
  repositoryId: z.string(),
  entityType: z.enum(['commit', 'branch', 'pull_request']),
  entityId: z.string(),
  /**
   * An optional property to use to control deletion. Only stored data with an updateSequenceId less than or equal to
   * that provided will be deleted. This can be used to help ensure submit/delete requests are applied correctly if they
   * are issued close together.
   */
  updateSequenceId: z.number(),
});

export type DeleteEntity = z.input<typeof DeleteEntitySchema>;
