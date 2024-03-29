export interface GetAllGadgets {
  /** The ID of the dashboard. */
  dashboardId: number;
  /**
   * The list of gadgets module keys. To include multiple module keys, separate module keys with ampersand:
   * `moduleKey=key:one&moduleKey=key:two`.
   */
  moduleKey?: string[];
  /**
   * The list of gadgets URIs. To include multiple URIs, separate URIs with ampersand:
   * `uri=/rest/example/uri/1&uri=/rest/example/uri/2`.
   */
  uri?: string[];
  /** The list of gadgets IDs. To include multiple IDs, separate IDs with ampersand: `gadgetId=10000&gadgetId=10001`. */
  gadgetId?: number[];
}
