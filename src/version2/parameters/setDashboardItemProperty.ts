export interface SetDashboardItemProperty {
  /** The ID of the dashboard. */
  dashboardId: string;
  /** The ID of the dashboard item. */
  itemId: string;
  /** The key of the dashboard item property. The maximum length is 255 characters. */
  propertyKey: string;
  body?: any;
}
