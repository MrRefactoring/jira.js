import { z } from 'zod';

export const GetPortalSchema = z.object({
  /** The id of the portal. */
  portalId: z.string(),
});

export type GetPortal = z.input<typeof GetPortalSchema>;
