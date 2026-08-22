import { z } from 'zod';
import { IssueLinkTypeOrderUpdateRequestSchema } from '../models';

export const MoveIssueLinkTypeSchema = z.object(IssueLinkTypeOrderUpdateRequestSchema.shape).extend({
  /** Id of the issue link type to move. */
  issueLinkTypeId: z.string(),
});

export type MoveIssueLinkType = z.input<typeof MoveIssueLinkTypeSchema>;
