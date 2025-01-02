/** Configuration of the announcement banner. */
export interface AnnouncementBannerConfigurationUpdate {
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible?: boolean;
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled?: boolean;
  /** The text on the announcement banner. */
  message?: string;
  /** Visibility of the announcement banner. Can be public or private. */
  visibility?: string;
}
