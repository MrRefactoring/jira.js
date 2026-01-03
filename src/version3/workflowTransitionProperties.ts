import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class WorkflowTransitionProperties {
  constructor(private client: Client) {}

  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); fetch transition properties
   *   from [Bulk get
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-post)
   *   instead.
   *
   *   Returns the properties on a workflow transition. Transition properties are used to change the behavior of a
   *   transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.GetWorkflowTransitionProperties,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); fetch transition properties
   *   from [Bulk get
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-post)
   *   instead.
   *
   *   Returns the properties on a workflow transition. Transition properties are used to change the behavior of a
   *   transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.GetWorkflowTransitionProperties,
    callback?: never,
  ): Promise<T>;
  async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.GetWorkflowTransitionProperties,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'GET',
      params: {
        includeReservedKeys: parameters.includeReservedKeys,
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); add transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Adds a property to a workflow transition. Transition properties are used to change the behavior of a transition.
   *   For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.CreateWorkflowTransitionProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); add transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Adds a property to a workflow transition. Transition properties are used to change the behavior of a transition.
   *   For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.CreateWorkflowTransitionProperty,
    callback?: never,
  ): Promise<T>;
  async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.CreateWorkflowTransitionProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'POST',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
      data: {
        ...parameters,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); update transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Updates a workflow transition by changing the property value. Trying to update a property that does not exist
   *   results in a new property being added to the transition. Transition properties are used to change the behavior of
   *   a transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.UpdateWorkflowTransitionProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); update transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Updates a workflow transition by changing the property value. Trying to update a property that does not exist
   *   results in a new property being added to the transition. Transition properties are used to change the behavior of
   *   a transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.UpdateWorkflowTransitionProperty,
    callback?: never,
  ): Promise<T>;
  async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(
    parameters: Parameters.UpdateWorkflowTransitionProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'PUT',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
      data: {
        ...parameters,
        transitionId: undefined,
        key: undefined,
        workflowName: undefined,
        workflowMode: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); delete transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Deletes a property from a workflow transition. Transition properties are used to change the behavior of a
   *   transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowTransitionProperty<T = unknown>(
    parameters: Parameters.DeleteWorkflowTransitionProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * @deprecated This will be removed on [June 1,
   *   2026](https://developer.atlassian.com/cloud/jira/platform/changelog/#CHANGE-2570); delete transition properties
   *   using [Bulk update
   *   workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-rest-api-3-workflows-update-post)
   *   instead.
   *
   *   Deletes a property from a workflow transition. Transition properties are used to change the behavior of a
   *   transition. For more information, see [Transition
   *   properties](https://confluence.atlassian.com/x/zIhKLg#Advancedworkflowconfiguration-transitionproperties) and
   *   [Workflow properties](https://confluence.atlassian.com/x/JYlKLg).
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteWorkflowTransitionProperty<T = unknown>(
    parameters: Parameters.DeleteWorkflowTransitionProperty,
    callback?: never,
  ): Promise<T>;
  async deleteWorkflowTransitionProperty<T = unknown>(
    parameters: Parameters.DeleteWorkflowTransitionProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/workflow/transitions/${parameters.transitionId}/properties`,
      method: 'DELETE',
      params: {
        key: parameters.key,
        workflowName: parameters.workflowName,
        workflowMode: parameters.workflowMode,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
