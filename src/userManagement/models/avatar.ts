import { z } from 'zod';
/** The absolute URI (RFC3986) to the avatar name of the user.* */

export const AvatarSchema = z.string();

export type Avatar = z.infer<typeof AvatarSchema>;
