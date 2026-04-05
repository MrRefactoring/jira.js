import { z } from 'zod';

/** Details of a locale. */
export const LocaleSchema = z.object({
  /**
   * The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and
   * two letter country code (ISO 3166). For example, en_US represents a locale of English (United States). Required on
   * create.
   */
  locale: z.string().optional(),
});

export type Locale = z.infer<typeof LocaleSchema>;
