/** Details of a request to bulk edit shareable entity. */
export interface BulkEditShareableEntity {
  /** Allowed action for bulk edit shareable entity */
  action: string;
  /** The mapping dashboard id to errors if any. */
  entityErrors?: {};
}
