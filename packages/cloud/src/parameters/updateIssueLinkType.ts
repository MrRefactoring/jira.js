import { z } from 'zod';
import { IssueLinkTypeSchema } from '../models';

export const UpdateIssueLinkTypeSchema = z
  .object({
    /** The ID of the issue link type. */
    issueLinkTypeId: z.string(),
  })
  .extend(IssueLinkTypeSchema.shape);

export type UpdateIssueLinkType = z.input<typeof UpdateIssueLinkTypeSchema>;
