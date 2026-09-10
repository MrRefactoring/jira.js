import { z } from 'zod';
import { GetScimLinksForEmailRequestSchema } from '../models';

export const GetScimLinksByEmailSchema = z.object(GetScimLinksForEmailRequestSchema.shape).extend({
  /**
   * Your organization is identified by a Unique ID. You get your organization ID and Organization API key
   * simultaneously.
   */
  orgId: z.string(),
});

export type GetScimLinksByEmail = z.input<typeof GetScimLinksByEmailSchema>;
