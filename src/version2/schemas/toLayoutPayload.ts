import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for the layout details for the destination end of a transition */
export const ToLayoutPayloadSchema = z.object({
  /** Defines where the transition line will be connected to a status. Port 0 to 7 are acceptable values. */
  port: z.number().int().optional(),
  status: ProjectCreateResourceIdentifierSchema.optional(),
});

export type ToLayoutPayload = z.infer<typeof ToLayoutPayloadSchema>;
