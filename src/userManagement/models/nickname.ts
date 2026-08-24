import { z } from 'zod';
/**
 * A nickname for the user in content references to the user.*
 *
 * _Constraints_*
 *
 * - `maxLength`: The maximum nickname length is 30 characters*
 * - `validCharacters`: Control and null characters are not allowed*
 */

export const NicknameSchema = z.string();

export type Nickname = z.infer<typeof NicknameSchema>;
