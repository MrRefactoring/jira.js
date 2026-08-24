import { z } from 'zod';
/** An IETF BCP 47 locale string */

export const LocaleSchema = z.string();

export type Locale = z.infer<typeof LocaleSchema>;
