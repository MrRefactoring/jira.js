/** @deprecated Use SimpleApplicationProperty instead. */
export type SimpleApplicationPropertyBean = SimpleApplicationProperty;

export interface SimpleApplicationProperty {
  /** The ID of the application property. */
  id?: string;
  /** The new value. */
  value?: string;
}
