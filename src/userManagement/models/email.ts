import { z } from 'zod';
/**
 * The email address of the user.*
 *
 * _Constraints_*
 *
 * - `partMaxLength`: The maximum length of the user part and of any* subdomain is 255 characters.*
 * - `validCharacters`: Control and null characters are not allowed*
 */

export const EmailSchema = z.string();

export type Email = z.infer<typeof EmailSchema>;
