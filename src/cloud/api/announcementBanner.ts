import {
  AnnouncementBannerConfigurationSchema,
  type AnnouncementBannerConfiguration,
} from '../models/announcementBannerConfiguration';
import type { SetBanner } from '../parameters/setBanner';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the current announcement banner configuration.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getBanner(client: Client, options?: RequestOptions): Promise<AnnouncementBannerConfiguration> {
  const config: SendRequestOptions<AnnouncementBannerConfiguration> = {
    url: '/rest/api/3/announcementBanner',
    method: 'GET',
    schema: AnnouncementBannerConfigurationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the announcement banner configuration.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setBanner(client: Client, parameters: SetBanner, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/announcementBanner',
    method: 'PUT',
    body: {
      isDismissible: parameters.isDismissible,
      isEnabled: parameters.isEnabled,
      message: parameters.message,
      visibility: parameters.visibility,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
