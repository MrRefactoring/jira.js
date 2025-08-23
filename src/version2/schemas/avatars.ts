import { z } from 'zod';
import { AvatarSchema } from './avatar';

/** Details about system and custom avatars. */
export const AvatarsSchema = z.object({
  /** Custom avatars list. */
  custom: z.array(AvatarSchema).optional(),
  /** System avatars list. */
  system: z.array(AvatarSchema).optional(),
});

export type Avatars = z.infer<typeof AvatarsSchema>;
