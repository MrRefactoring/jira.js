/** @deprecated Use IdOrKey instead. */
export type IdOrKeyBean = IdOrKey;

export interface IdOrKey {
  /** The ID of the referenced item. */
  id?: number;
  /** The key of the referenced item. */
  key?: string;
}
