export interface SetDashboardItemProperty {
  /** The ID of the dashboard. */
  dashboardId: string;
  /** The ID of the dashboard item. */
  itemId: string;
  /**
   * The key of the dashboard item property. The maximum length is 255 characters. For dashboard items with a spec URI
   * and no complete module key, if the provided propertyKey is equal to "config", the request body's JSON must be an
   * object with all keys and values as strings.
   */
  propertyKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  propertyValue: any;
}
