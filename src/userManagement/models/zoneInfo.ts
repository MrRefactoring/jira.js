import { z } from 'zod';
/** A unix zoneinfo string describing the local timezone of the user* */

export const ZoneInfoSchema = z.string();

export type ZoneInfo = z.infer<typeof ZoneInfoSchema>;
