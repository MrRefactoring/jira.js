import type { Client } from '../client';
import type { Request } from '../request';
import type { RemoveModulesParameters } from './parameters/removeModulesParameters';
import type { RegisterModulesParameters } from './parameters/registerModulesParameters';

export class DynamicModules {
  constructor(private client: Client) {}
  /**
   * Remove all or a list of modules registered by the calling app. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Connect apps can make this request.
   */
  async removeModules(parameters: RemoveModulesParameters) {
    const request: Request = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
      query: {
        moduleKey: parameters.moduleKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all modules registered dynamically by the calling app. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Connect apps can make this request.
   */
  async getModules() {
    const request: Request = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Registers a list of modules. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Connect apps can make this request.
   */
  async registerModules(parameters: RegisterModulesParameters) {
    const request: Request = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
      body: {
        modules: parameters.modules,
      },
    };

    return this.client.sendRequest(request);
  }
}
