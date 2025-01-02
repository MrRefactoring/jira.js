import * as Models from './models/index.mjs';
import * as Parameters from './parameters/index.mjs';
import type { Callback } from '@/callback.mjs';
import type { Client } from '../clients/index.mjs';
import type { RequestConfig } from '@/requestConfig.mjs';

export class AnnouncementBanner {
  constructor(private client: Client) {}

  /**
   * Returns the current announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the current announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback?: never): Promise<T>;
  async getBanner<T = Models.AnnouncementBannerConfiguration>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/announcementBanner',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setBanner<T = void>(parameters: Parameters.SetBanner, callback: Callback<T>): Promise<void>;
  /**
   * Updates the announcement banner configuration.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setBanner<T = void>(parameters: Parameters.SetBanner, callback?: never): Promise<T>;
  async setBanner<T = void>(parameters: Parameters.SetBanner, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/announcementBanner',
      method: 'PUT',
      data: {
        isDismissible: parameters.isDismissible,
        isEnabled: parameters.isEnabled,
        message: parameters.message,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
