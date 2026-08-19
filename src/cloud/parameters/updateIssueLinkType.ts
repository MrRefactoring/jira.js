import { z } from 'zod';
import { IssueLinkTypeSchema } from '../models';

export const UpdateIssueLinkTypeSchema = z.object(IssueLinkTypeSchema.shape).extend({
  /** The ID of the issue link type. */
  issueLinkTypeId: z.string(),
});

export type UpdateIssueLinkType = z.input<typeof UpdateIssueLinkTypeSchema>;
