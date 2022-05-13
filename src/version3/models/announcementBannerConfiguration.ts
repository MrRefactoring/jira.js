/** Announcement banner configuration. */
export interface AnnouncementBannerConfiguration {
  /** The text on the announcement banner. */
  message?: string;
  /** Flag indicating if the announcement banner can be dismissed by the user. */
  isDismissible?: boolean;
  /** Flag indicating if the announcement banner is enabled or not. */
  isEnabled?: boolean;
  /** Hash of the banner data. The client detects updates by comparing hash IDs. */
  hashId?: string;
  /** Visibility of the announcement banner. */
  visibility?: string;
}
