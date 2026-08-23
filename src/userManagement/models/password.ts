import { z } from 'zod';
/** A secret for use by the user in basic authentication flows* */

export const PasswordSchema = z.string();

export type Password = z.infer<typeof PasswordSchema>;
