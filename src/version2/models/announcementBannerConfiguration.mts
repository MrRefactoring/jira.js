/** Announcement banner configuration. */
export interface AnnouncementBannerConfiguration {
  /** Hash of the banner data. The client detects updates by comparing hash IDs. */
  hashId?: string;
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible?: boolean;
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled?: boolean;
  /** The text on the announcement banner. */
  message?: string;
  /** Visibility of the announcement banner. */
  visibility?: string;
}
