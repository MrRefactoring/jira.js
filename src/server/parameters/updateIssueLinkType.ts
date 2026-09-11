import { z } from 'zod';
import { IssueLinkTypeJsonSchema } from '../models';

export const UpdateIssueLinkTypeSchema = z.object(IssueLinkTypeJsonSchema.shape).extend({
  /** The issue link type id. */
  issueLinkTypeId: z.string(),
});

export type UpdateIssueLinkType = z.input<typeof UpdateIssueLinkTypeSchema>;
