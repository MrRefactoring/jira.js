/** Details of a locale. */
export interface Locale {
  /**
   * The locale code. The Java the locale format is used: a two character language code (ISO 639), an underscore, and
   * two letter country code (ISO 3166). For example, en_US represents a locale of English (United States). Required on create.
   */
  locale?: string;
}
