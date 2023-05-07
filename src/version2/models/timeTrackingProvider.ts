/** Details about the time tracking provider. */
export interface TimeTrackingProvider {
  /** The key for the time tracking provider. For example, _JIRA_. */
  key: string;
  /** The name of the time tracking provider. For example, _JIRA provided time tracking_. */
  name?: string;
  /**
   * The URL of the configuration page for the time tracking provider app. For example, _/example/config/url_. This
   * property is only returned if the `adminPageKey` property is set in the module descriptor of the time tracking
   * provider app.
   */
  url?: string;
}
