import { z } from 'zod';
import { BulkOperationRequestSchema } from '../models';

export const ArchiveTeamsSchema = z.object(BulkOperationRequestSchema.shape).extend({
  /** The ID of the organisation that owns the teams to archive. */
  orgId: z.string(),
});

export type ArchiveTeams = z.input<typeof ArchiveTeamsSchema>;
