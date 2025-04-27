/** Mapping of issue priorities for changes in priority schemes. */
export interface PriorityMapping {
  /**
   * The mapping of priorities for issues being migrated **into** this priority scheme. Key is the old priority ID,
   * value is the new priority ID (must exist in this priority scheme).
   *
   *     E.g. The current priority scheme has priority ID `10001`. Issues with priority ID `10000` are being migrated into this priority scheme will need mapping to new priorities. The `in` mapping would be `{"10000": 10001}`.
   */
  in?: unknown;
  /**
   * The mapping of priorities for issues being migrated **out of** this priority scheme. Key is the old priority ID
   * (must exist in this priority scheme), value is the new priority ID (must exist in the default priority scheme).
   * Required for updating an existing priority scheme. Not used when creating a new priority scheme.
   *
   *     E.g. The current priority scheme has priority ID `10001`. Issues with priority ID `10001` are being migrated out of this priority scheme will need mapping to new priorities. The `out` mapping would be `{"10001": 10000}`.
   */
  out?: unknown;
}
