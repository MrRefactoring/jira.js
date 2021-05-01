import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Sprint {
  constructor(private client: Client) {
  }

  /**
   * Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.
   *
   *  <p>
   *  Note that the sprint name is trimmed. Also, when starting sprints from the UI, the "endDate" set through this
   *  call is ignored and instead the last sprint's duration is used to fill the form.
   *  </p>  */
  async createSprint<T = Models.SprintBean>(parameters: Parameters.CreateSprint | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a future sprint. Sprint name and origin board id are required. Start date, end date, and goal are optional.
   *
   *  <p>
   *  Note that the sprint name is trimmed. Also, when starting sprints from the UI, the "endDate" set through this
   *  call is ignored and instead the last sprint's duration is used to fill the form.
   *  </p>  */
  async createSprint<T = Models.SprintBean>(parameters?: Parameters.CreateSprint, callback?: never): Promise<T>;
  async createSprint<T = Models.SprintBean>(parameters?: Parameters.CreateSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/agile/1.0/sprint',
      method: 'POST',
      data: {
        name: parameters?.name,
        startDate: parameters?.startDate,
        endDate: parameters?.endDate,
        originBoardId: parameters?.originBoardId,
        goal: parameters?.goal,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.createSprint' });
  }

  /**
   * Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board
   *  that the sprint was created on, or view at least one of the issues in the sprint.  */
  async getSprint<T = Models.SprintBean>(parameters: Parameters.GetSprint, callback: Callback<T>): Promise<void>;
  /**
   * Returns the sprint for a given sprint ID. The sprint will only be returned if the user can view the board
   *  that the sprint was created on, or view at least one of the issues in the sprint.  */
  async getSprint<T = Models.SprintBean>(parameters: Parameters.GetSprint, callback?: never): Promise<T>;
  async getSprint<T = Models.SprintBean>(parameters: Parameters.GetSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getSprint' });
  }

  /**
   * Performs a partial update of a sprint.
   *  A partial update means that fields not present in the request JSON will not be updated.
   *  <p>Notes:</p>
   *  <ul>
   *  <li>Sprints that are in a closed state cannot be updated.</li>
   *  <li>A sprint can be started by updating the state to 'active'. This requires the sprint to
   *  be in the 'future' state and have a startDate and endDate set.</li>
   *  <li>A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state.
   *  This sets the completeDate to the time of the request.</li>
   *  <li>Other changes to state are not allowed.</li>
   *  <li>The completeDate field cannot be updated manually.</li>
   *  </ul>  */
  async partiallyUpdateSprint<T = Models.SprintBean>(parameters: Parameters.PartiallyUpdateSprint, callback: Callback<T>): Promise<void>;
  /**
   * Performs a partial update of a sprint.
   *  A partial update means that fields not present in the request JSON will not be updated.
   *  <p>Notes:</p>
   *  <ul>
   *  <li>Sprints that are in a closed state cannot be updated.</li>
   *  <li>A sprint can be started by updating the state to 'active'. This requires the sprint to
   *  be in the 'future' state and have a startDate and endDate set.</li>
   *  <li>A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state.
   *  This sets the completeDate to the time of the request.</li>
   *  <li>Other changes to state are not allowed.</li>
   *  <li>The completeDate field cannot be updated manually.</li>
   *  </ul>  */
  async partiallyUpdateSprint<T = Models.SprintBean>(parameters: Parameters.PartiallyUpdateSprint, callback?: never): Promise<T>;
  async partiallyUpdateSprint<T = Models.SprintBean>(parameters: Parameters.PartiallyUpdateSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'POST',
      data: {
        id: parameters.id,
        self: parameters.self,
        state: parameters.state,
        name: parameters.name,
        startDate: parameters.startDate,
        endDate: parameters.endDate,
        completeDate: parameters.completeDate,
        originBoardId: parameters.originBoardId,
        goal: parameters.goal,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.partiallyUpdateSprint' });
  }

  /**
   * Performs a full update of a sprint.
   *  A full update means that the result will be exactly the same as the request body.
   *  Any fields not present in the request JSON will be set to null.
   *  <p>Notes:</p>
   *  <ul>
   *  <li>Sprints that are in a closed state cannot be updated.</li>
   *  <li>A sprint can be started by updating the state to 'active'. This requires the sprint to
   *  be in the 'future' state and have a startDate and endDate set.</li>
   *  <li>A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state.
   *  This sets the completeDate to the time of the request.</li>
   *  <li>Other changes to state are not allowed.</li>
   *  <li>The completeDate field cannot be updated manually.</li>
   *  </ul>  */
  async updateSprint<T = Models.SprintBean>(parameters: Parameters.UpdateSprint, callback: Callback<T>): Promise<void>;
  /**
   * Performs a full update of a sprint.
   *  A full update means that the result will be exactly the same as the request body.
   *  Any fields not present in the request JSON will be set to null.
   *  <p>Notes:</p>
   *  <ul>
   *  <li>Sprints that are in a closed state cannot be updated.</li>
   *  <li>A sprint can be started by updating the state to 'active'. This requires the sprint to
   *  be in the 'future' state and have a startDate and endDate set.</li>
   *  <li>A sprint can be completed by updating the state to 'closed'. This action requires the sprint to be in the 'active' state.
   *  This sets the completeDate to the time of the request.</li>
   *  <li>Other changes to state are not allowed.</li>
   *  <li>The completeDate field cannot be updated manually.</li>
   *  </ul>  */
  async updateSprint<T = Models.SprintBean>(parameters: Parameters.UpdateSprint, callback?: never): Promise<T>;
  async updateSprint<T = Models.SprintBean>(parameters: Parameters.UpdateSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        self: parameters.self,
        state: parameters.state,
        name: parameters.name,
        startDate: parameters.startDate,
        endDate: parameters.endDate,
        completeDate: parameters.completeDate,
        originBoardId: parameters.originBoardId,
        goal: parameters.goal,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.updateSprint' });
  }

  /**
   * Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.  */
  async deleteSprint<T = void>(parameters: Parameters.DeleteSprint, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a sprint. Once a sprint is deleted, all open issues in the sprint will be moved to the backlog.  */
  async deleteSprint<T = void>(parameters: Parameters.DeleteSprint, callback?: never): Promise<T>;
  async deleteSprint<T = void>(parameters: Parameters.DeleteSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.deleteSprint' });
  }

  /**
   * Returns all issues in a sprint, for a given sprint ID. This only includes issues that the user has permission to view.
   *  By default, the returned issues are ordered by rank.  */
  async getIssuesForSprint<T = Models.IssueBean>(parameters: Parameters.GetIssuesForSprint, callback: Callback<T>): Promise<void>;
  /**
   * Returns all issues in a sprint, for a given sprint ID. This only includes issues that the user has permission to view.
   *  By default, the returned issues are ordered by rank.  */
  async getIssuesForSprint<T = Models.IssueBean>(parameters: Parameters.GetIssuesForSprint, callback?: never): Promise<T>;
  async getIssuesForSprint<T = Models.IssueBean>(parameters: Parameters.GetIssuesForSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        jql: parameters.jql,
        validateQuery: parameters.validateQuery,
        fields: parameters.fields,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getIssuesForSprint' });
  }

  /**
   * Moves issues to a sprint, for a given sprint ID.
   *  Issues can only be moved to open or active sprints.
   *  The maximum number of issues that can be moved in one operation is 50.  */
  async moveIssuesToSprintAndRank<T = void>(parameters: Parameters.MoveIssuesToSprintAndRank, callback: Callback<T>): Promise<void>;
  /**
   * Moves issues to a sprint, for a given sprint ID.
   *  Issues can only be moved to open or active sprints.
   *  The maximum number of issues that can be moved in one operation is 50.  */
  async moveIssuesToSprintAndRank<T = void>(parameters: Parameters.MoveIssuesToSprintAndRank, callback?: never): Promise<T>;
  async moveIssuesToSprintAndRank<T = void>(parameters: Parameters.MoveIssuesToSprintAndRank, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
        rankBeforeIssue: parameters.rankBeforeIssue,
        rankAfterIssue: parameters.rankAfterIssue,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.moveIssuesToSprintAndRank' });
  }

  /**
   * Returns the keys of all properties for the sprint identified by the id.
   *  The user who retrieves the property keys is required to have permissions to view the sprint.  */
  async getPropertiesKeys<T = unknown>(parameters: Parameters.GetPropertiesKeys, callback: Callback<T>): Promise<void>;
  /**
   * Returns the keys of all properties for the sprint identified by the id.
   *  The user who retrieves the property keys is required to have permissions to view the sprint.  */
  async getPropertiesKeys<T = unknown>(parameters: Parameters.GetPropertiesKeys, callback?: never): Promise<T>;
  async getPropertiesKeys<T = unknown>(parameters: Parameters.GetPropertiesKeys, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getPropertiesKeys' });
  }

  /**
   * Returns the value of the property with a given key from the sprint identified by the provided id.
   *  The user who retrieves the property is required to have permissions to view the sprint.  */
  async getProperty<T = unknown>(parameters: Parameters.GetProperty, callback: Callback<T>): Promise<void>;
  /**
   * Returns the value of the property with a given key from the sprint identified by the provided id.
   *  The user who retrieves the property is required to have permissions to view the sprint.  */
  async getProperty<T = unknown>(parameters: Parameters.GetProperty, callback?: never): Promise<T>;
  async getProperty<T = unknown>(parameters: Parameters.GetProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.getProperty' });
  }

  /**
   * Sets the value of the specified sprint's property.
   *  <p>
   *      You can use this resource to store a custom data against the sprint identified by the id. The user
   *      who stores the data is required to have permissions to modify the sprint.
   *  </p>  */
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of the specified sprint's property.
   *  <p>
   *      You can use this resource to store a custom data against the sprint identified by the id. The user
   *      who stores the data is required to have permissions to modify the sprint.
   *  </p>  */
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback?: never): Promise<T>;
  async setProperty<T = unknown>(parameters: Parameters.SetProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.setProperty' });
  }

  /**
   * Removes the property from the sprint identified by the id. Ths user removing the property is required
   *  to have permissions to modify the sprint.  */
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback: Callback<T>): Promise<void>;
  /**
   * Removes the property from the sprint identified by the id. Ths user removing the property is required
   *  to have permissions to modify the sprint.  */
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback?: never): Promise<T>;
  async deleteProperty<T = void>(parameters: Parameters.DeleteProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.deleteProperty' });
  }

  /**
   * Swap the position of the sprint with the second sprint.  */
  async swapSprint<T = void>(parameters: Parameters.SwapSprint, callback: Callback<T>): Promise<void>;
  /**
   * Swap the position of the sprint with the second sprint.  */
  async swapSprint<T = void>(parameters: Parameters.SwapSprint, callback?: never): Promise<T>;
  async swapSprint<T = void>(parameters: Parameters.SwapSprint, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/agile/1.0/sprint/${parameters.sprintId}/swap`,
      method: 'POST',
      data: {
        sprintToSwapWith: parameters.sprintToSwapWith,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.sprint.swapSprint' });
  }
}
