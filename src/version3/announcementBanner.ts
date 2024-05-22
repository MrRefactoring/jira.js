import * as Models from './models/index.js';
import * as Parameters from './parameters/index.js';
import type { Callback } from '../callback.js';
import type { Client } from '../clients/index.js';
import type { RequestConfig } from '../requestConfig.js';

export class AnnouncementBanner {
  constructor(private client: Client) {}

  /**
   * Returns the current announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the current announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback?: never): Promise<T>;
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/announcementBanner',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setBanner<T = void>(parameters: Parameters.SetBanner | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Updates the announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setBanner<T = void>(parameters?: Parameters.SetBanner, callback?: never): Promise<T>;
  async setBanner<T = void>(parameters?: Parameters.SetBanner, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/announcementBanner',
      method: 'PUT',
      data: {
        isDismissible: parameters?.isDismissible,
        isEnabled: parameters?.isEnabled,
        message: parameters?.message,
        visibility: parameters?.visibility,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
