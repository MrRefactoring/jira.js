import { TimeTrackingProviderSchema, type TimeTrackingProvider } from '#/models/timeTrackingProvider';
import { TimeTrackingConfigurationSchema, type TimeTrackingConfiguration } from '#/models/timeTrackingConfiguration';
import { type SelectTimeTrackingImplementation } from '#/parameters/selectTimeTrackingImplementation';
import { type SetSharedTimeTrackingConfiguration } from '#/parameters/setSharedTimeTrackingConfiguration';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Returns the time tracking provider that is currently selected. Note that if time tracking is disabled, then a
 * successful but empty response is returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getSelectedTimeTrackingImplementation(client: Client): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/configuration/timetracking',
    method: 'GET',
  };

  return await client.sendRequest(config);
}

/**
 * Selects a time tracking provider.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function selectTimeTrackingImplementation(
  client: Client,
  parameters: SelectTimeTrackingImplementation,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/3/configuration/timetracking',
    method: 'PUT',
    body: {
      key: parameters.key,
      name: parameters.name,
      url: parameters.url,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns all time tracking providers. By default, Jira only has one time tracking provider: _JIRA provided time
 * tracking_. However, you can install other time tracking providers via apps from the Atlassian Marketplace. For more
 * information on time tracking providers, see the documentation for the [ Time Tracking
 * Provider](https://developer.atlassian.com/cloud/jira/platform/modules/time-tracking-provider/) module.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getAvailableTimeTrackingImplementations(client: Client): Promise<TimeTrackingProvider[]> {
  const config: SendRequestOptions<TimeTrackingProvider[]> = {
    url: '/rest/api/3/configuration/timetracking/list',
    method: 'GET',
    schema: z.array(TimeTrackingProviderSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns the time tracking settings. This includes settings such as the time format, default time unit, and others.
 * For more information, see [Configuring time tracking](https://confluence.atlassian.com/x/qoXKM).
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getSharedTimeTrackingConfiguration(client: Client): Promise<TimeTrackingConfiguration> {
  const config: SendRequestOptions<TimeTrackingConfiguration> = {
    url: '/rest/api/3/configuration/timetracking/options',
    method: 'GET',
    schema: TimeTrackingConfigurationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the time tracking settings.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function setSharedTimeTrackingConfiguration(
  client: Client,
  parameters: SetSharedTimeTrackingConfiguration,
): Promise<TimeTrackingConfiguration> {
  const config: SendRequestOptions<TimeTrackingConfiguration> = {
    url: '/rest/api/3/configuration/timetracking/options',
    method: 'PUT',
    body: {
      defaultUnit: parameters.defaultUnit,
      timeFormat: parameters.timeFormat,
      workingDaysPerWeek: parameters.workingDaysPerWeek,
      workingHoursPerDay: parameters.workingHoursPerDay,
    },
    schema: TimeTrackingConfigurationSchema,
  };

  return await client.sendRequest(config);
}
