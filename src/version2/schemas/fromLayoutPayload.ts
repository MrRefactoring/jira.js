import { z } from 'zod';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';

/** The payload for the layout details for the start end of a transition */
export const FromLayoutPayloadSchema = z.object({
  /** The port that the transition can be made from */
  fromPort: z.number().int().optional(),
  status: ProjectCreateResourceIdentifierSchema.optional(),
  /** The port that the transition goes to */
  toPortOverride: z.number().int().optional(),
});

export type FromLayoutPayload = z.infer<typeof FromLayoutPayloadSchema>;
