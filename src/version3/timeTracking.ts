import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class TimeTracking {
  constructor(private client: Client) {
  }

  /**
   * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSelectedTimeTrackingImplementation<T = void>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSelectedTimeTrackingImplementation<T = void>(callback?: never): Promise<T>;
  async getSelectedTimeTrackingImplementation<T = void>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/configuration/timetracking',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.timeTracking.getSelectedTimeTrackingImplementation' });
  }

  /**
   * Selects a time tracking provider.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async selectTimeTrackingImplementation<T = void>(parameters: Parameters.SelectTimeTrackingImplementation | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Selects a time tracking provider.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async selectTimeTrackingImplementation<T = void>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: never): Promise<T>;
  async selectTimeTrackingImplementation<T = void>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/configuration/timetracking',
      method: 'PUT',
      data: {
        key: parameters?.key,
        name: parameters?.name,
        url: parameters?.url,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.timeTracking.selectTimeTrackingImplementation' });
  }

  /**
   * Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the [ Time Tracking Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableTimeTrackingImplementations<T = Models.TimeTrackingProvider[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the [ Time Tracking Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableTimeTrackingImplementations<T = Models.TimeTrackingProvider[]>(callback?: never): Promise<T>;
  async getAvailableTimeTrackingImplementations<T = Models.TimeTrackingProvider[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/configuration/timetracking/list',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.timeTracking.getAvailableTimeTrackingImplementations' });
  }

  /**
   * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: never): Promise<T>;
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.timeTracking.getSharedTimeTrackingConfiguration' });
  }

  /**
   * Sets the time tracking settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters: Parameters.SetSharedTimeTrackingConfiguration | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Sets the time tracking settings.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: never): Promise<T>;
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/configuration/timetracking/options',
      method: 'PUT',
      data: {
        workingHoursPerDay: parameters?.workingHoursPerDay,
        workingDaysPerWeek: parameters?.workingDaysPerWeek,
        timeFormat: parameters?.timeFormat,
        defaultUnit: parameters?.defaultUnit,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.timeTracking.setSharedTimeTrackingConfiguration' });
  }
}
