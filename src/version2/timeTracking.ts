import type { Client } from '../client';
import type { Request } from '../request';
import type { SelectTimeTrackingImplementationParameters } from './parameters/selectTimeTrackingImplementationParameters';
import type { SetSharedTimeTrackingConfigurationParameters } from './parameters/setSharedTimeTrackingConfigurationParameters';

export class TimeTracking {
  constructor(private client: Client) {}
  /**
   * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a
   * successful but empty response is returned. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSelectedTimeTrackingImplementation() {
    const request: Request = {
      url: '/rest/api/2/configuration/timetracking',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Selects a time tracking provider. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async selectTimeTrackingImplementation(parameters: SelectTimeTrackingImplementationParameters) {
    const request: Request = {
      url: '/rest/api/2/configuration/timetracking',
      method: 'PUT',
      body: {
        key: parameters.key,
        name: parameters.name,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all time tracking providers. By default, Jira only has one time tracking provider: _JIRA provided time
   * tracking_. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more
   * information on time tracking providers, see the documentation for the [ Time Tracking
   * Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableTimeTrackingImplementations() {
    const request: Request = {
      url: '/rest/api/2/configuration/timetracking/list',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others.
   * For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSharedTimeTrackingConfiguration() {
    const request: Request = {
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the time tracking settings. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setSharedTimeTrackingConfiguration(parameters: SetSharedTimeTrackingConfigurationParameters) {
    const request: Request = {
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'PUT',
      body: {
        defaultUnit: parameters.defaultUnit,
        timeFormat: parameters.timeFormat,
        workingDaysPerWeek: parameters.workingDaysPerWeek,
        workingHoursPerDay: parameters.workingHoursPerDay,
      },
    };

    return this.client.sendRequest(request);
  }
}
