import { z } from 'zod';
/**
 * The display name of the user. Should be used for contextual rendering of* content authorship.*
 *
 * _Constraints_*
 *
 * - `maxLength`: The maximum display name length is 100 characters*
 * - `validCharacters`: Control and null characters are not allowed*
 */

export const NameSchema = z.string();

export type Name = z.infer<typeof NameSchema>;
