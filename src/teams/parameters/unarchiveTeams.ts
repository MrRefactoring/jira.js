import { z } from 'zod';
import { BulkOperationRequestSchema } from '../models';

export const UnarchiveTeamsSchema = z.object(BulkOperationRequestSchema.shape).extend({
  /** The ID of the organisation that owns the teams to unarchive. */
  orgId: z.string(),
});

export type UnarchiveTeams = z.input<typeof UnarchiveTeamsSchema>;
