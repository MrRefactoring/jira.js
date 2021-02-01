import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class TimeTracking {
  constructor(private client: Client) { }
  /**
     * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSelectedTimeTrackingImplementation<T = void>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a successful but empty response is returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSelectedTimeTrackingImplementation<T = void>(callback?: undefined): Promise<T>;
  async getSelectedTimeTrackingImplementation<T = void>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration/timetracking',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getSelectedTimeTrackingImplementation' });
  }
  /**
     * Selects a time tracking provider.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async selectTimeTrackingImplementation<T = void>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: Callback<T>): Promise<void>;
  /**
     * Selects a time tracking provider.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async selectTimeTrackingImplementation<T = void>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: undefined): Promise<T>;
  async selectTimeTrackingImplementation<T = void>(parameters?: Parameters.SelectTimeTrackingImplementation, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration/timetracking',
      method: 'PUT',
      data: {
        key: parameters?.key,
        name: parameters?.name,
        url: parameters?.url,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'selectTimeTrackingImplementation' });
  }
  /**
     * Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the [ Time Tracking Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableTimeTrackingImplementations<T = any>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns all time tracking providers. By default, Jira only has one time tracking provider: *JIRA provided time tracking*. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more information on time tracking providers, see the documentation for the [ Time Tracking Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableTimeTrackingImplementations<T = any>(callback?: undefined): Promise<T>;
  async getAvailableTimeTrackingImplementations<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration/timetracking/list',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAvailableTimeTrackingImplementations' });
  }
  /**
     * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others. For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: undefined): Promise<T>;
  async getSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getSharedTimeTrackingConfiguration' });
  }
  /**
     * Sets the time tracking settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: Callback<T>): Promise<void>;
  /**
     * Sets the time tracking settings.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: undefined): Promise<T>;
  async setSharedTimeTrackingConfiguration<T = Models.TimeTrackingConfiguration>(parameters?: Parameters.SetSharedTimeTrackingConfiguration, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration/timetracking/options',
      method: 'PUT',
      data: {
        workingHoursPerDay: parameters?.workingHoursPerDay,
        workingDaysPerWeek: parameters?.workingDaysPerWeek,
        timeFormat: parameters?.timeFormat,
        defaultUnit: parameters?.defaultUnit,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'setSharedTimeTrackingConfiguration' });
  }
}
