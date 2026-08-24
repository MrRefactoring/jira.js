import { z } from 'zod';
import { BulkOperationRequestSchema } from '../models';

export const UnlinkTeamsFromExternalSourceSchema = z.object(BulkOperationRequestSchema.shape).extend({
  /** The ID of the organisation that owns the managed teams to unlink. */
  orgId: z.string(),
});

export type UnlinkTeamsFromExternalSource = z.input<typeof UnlinkTeamsFromExternalSourceSchema>;
