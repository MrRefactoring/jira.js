import { z } from 'zod';
/** The physical location of the user* */

export const LocationSchema = z.string();

export type Location = z.infer<typeof LocationSchema>;
