import type { Client } from '../client';
import type { Request } from '../request';
import type { SetBannerParameters } from './parameters/setBannerParameters';

export class AnnouncementBanner {
  constructor(private client: Client) {}
  /**
   * Returns the current announcement banner configuration. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBanner() {
    const request: Request = {
      url: '/rest/api/2/announcementBanner',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the announcement banner configuration. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setBanner(parameters: SetBannerParameters) {
    const request: Request = {
      url: '/rest/api/2/announcementBanner',
      method: 'PUT',
      body: {
        isDismissible: parameters.isDismissible,
        isEnabled: parameters.isEnabled,
        message: parameters.message,
        visibility: parameters.visibility,
      },
    };

    return this.client.sendRequest(request);
  }
}
